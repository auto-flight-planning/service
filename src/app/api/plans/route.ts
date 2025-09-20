import { NextRequest, NextResponse } from "next/server";
import { type User } from "@supabase/supabase-js";
import planService from "@/features/plan/base/server/service";
import camelcaseKeys from "camelcase-keys";
import { createPlanReqSchema } from "@/features/plan/base/server/schemas/req.schema";
import { createPlanResSchema } from "@/features/plan/base/server/schemas/res.schema";
import { APIWrapper } from "@/server/lib/helpers";
import { dateToString } from "@/lib/utils";

export const POST = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<any> },
    user: User
  ) => {
    const requestBody = await request.json();
    const validatedRequestBody = createPlanReqSchema.parse(requestBody);
    const camelcaseRequestBody = camelcaseKeys(validatedRequestBody, {
      deep: true,
    });

    const { plan, planParticipants } = await planService.createPlan({
      ...camelcaseRequestBody,
      creatorId: user.id,
    });

    const { target_date, ...planRest } = plan;
    const res = createPlanResSchema.parse({
      ...planRest,
      target_date: dateToString(target_date),
      participant_data_list: planParticipants.map(
        ({ plan_id, ...participantRest }) => participantRest
      ),
    });
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
