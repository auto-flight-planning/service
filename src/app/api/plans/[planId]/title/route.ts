import { NextRequest, NextResponse } from "next/server";
import { User } from "@supabase/supabase-js";
import plansRepo from "@/server/repos/plans/plans.repo";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { updatePlanTitleReqSchema } from "@/features/plan/base/server/schemas/req.schema";
import { planSchema } from "@/features/plan/base/server/schemas/common.schema";
import { ForbiddenError, NotFoundError, withHandler } from "@/server/lib";
import { dateToString } from "@/lib/utils";

export const PUT = withHandler(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const plan = await plansRepo.findOne({ id: planId });
    if (!plan) {
      throw new NotFoundError("企画が見つかりません");
    }
    if (plan.creator_id !== user.id) {
      throw new ForbiddenError("企画のタイトルを変更は生成者のみ可能です");
    }

    const requestBody = await request.json();
    const validatedRequestBody = updatePlanTitleReqSchema.parse(requestBody);
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
