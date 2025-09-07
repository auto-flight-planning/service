import { NextRequest, NextResponse } from "next/server";
import { User } from "@supabase/supabase-js";
import { withHandler } from "@/server/lib";
import planService from "@/features/plan/base/server/service";
import { createPlanReqSchema } from "@/features/plan/base/server/schemas/req.schema";
import { createPlanResSchema } from "@/features/plan/base/server/schemas/res.schema";
import { dateToString } from "@/lib/utils";

export const POST = withHandler(
  async (
    request: NextRequest,
    { params }: { params: Promise<any> },
    user: User
  ) => {
    const requestBody = await request.json();
    const validatedRequestBody = createPlanReqSchema.parse(requestBody);
    const { title, targetDate, participantDataList } = validatedRequestBody;

    const { plan, planParticipants } = await planService.createPlan({
      title,
      targetDate,
      creatorId: user.id,
      participantDataList,
    });

    const res = createPlanResSchema.parse({
      id: plan.id,
      creatorId: plan.creator_id,
      title: plan.title,
      targetDate: dateToString(plan.target_date),
      status: plan.status,
      participantDataList: planParticipants.map((participant) => ({
        userId: participant.user_id,
        permission: participant.permission,
      })),
    });

    return NextResponse.json(res);
  },
  {
    onAuth: true,
    onError: true,
  }
);
