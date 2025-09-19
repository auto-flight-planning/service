import { NextRequest, NextResponse } from "next/server";
import { User } from "@supabase/supabase-js";
import plansRepo from "@/server/repos/plans/plans.repo";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { updatePlanTitleReqSchema } from "@/features/plan/base/server/schemas/req.schema";
import { planSchema } from "@/features/plan/base/server/schemas/common.schema";
import { APIWrapper, doPlanCheck } from "@/server/lib";
import { dateToString } from "@/lib/utils";

export const PUT = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const requestBody = await request.json();
    const validatedRequestBody = updatePlanTitleReqSchema.parse(requestBody);

    await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "CREATOR" } },
    });

    const { title } = validatedRequestBody;
    const updatedPlan = await plansRepo.updateOneTitle({ id: planId, title });

    const res = planSchema.parse({
      id: updatedPlan.id,
      creatorId: updatedPlan.creator_id,
      title: updatedPlan.title,
      targetDate: dateToString(updatedPlan.target_date),
      status: updatedPlan.status,
      createdAt: updatedPlan.created_at,
    });
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
