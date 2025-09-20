import { NextRequest, NextResponse } from "next/server";
import planParticipantsService from "@/features/plan/participant/servers/service";
import camelcaseKeys from "camelcase-keys";
import { type User } from "@supabase/supabase-js";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import {
  getPlanParticipantsResSchema,
  updatePlanParticipantsResSchema,
} from "@/features/plan/participant/servers/schemas/res.schema";
import { updateParticipantsReqSchema } from "@/features/plan/participant/servers/schemas/req.schema";
import { APIWrapper, doPlanCheck } from "@/server/lib/helpers";

export const GET = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const { planParticipants } = await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "VIEW" } },
    });

    const res = getPlanParticipantsResSchema.parse(planParticipants!);
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);

export const PUT = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const requestBody = await request.json();
    const validatedRequestBody = updateParticipantsReqSchema.parse(requestBody);

    await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "CREATOR" } },
    });

    const camelcaseRequestBody = camelcaseKeys(validatedRequestBody, {
      deep: true,
    });
    const updatedParticipants =
      await planParticipantsService.updatePlanParticipants({
        planId,
        updateParticipantData: camelcaseRequestBody,
      });

    const res = updatePlanParticipantsResSchema.parse(updatedParticipants);
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
