import { NextRequest, NextResponse } from "next/server";
import plansRepo from "@/server/repos/plans/plans.repo";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { planSchema } from "@/features/plan/base/server/schemas/common.schema";
import { withHandler } from "@/server/lib";
import { dateToString } from "@/lib/utils";

export const GET = withHandler(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> }
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const plan = await plansRepo.findOne({ id: planId });

    if (!plan) {
      return NextResponse.json(
        { error: "企画が見つかりません" },
        { status: 404 }
      );
    }

    const res = planSchema.parse({
      id: plan.id,
      creatorId: plan.creator_id,
      title: plan.title,
      targetDate: dateToString(plan.target_date),
      status: plan.status,
      createdAt: plan.created_at,
    });
    return NextResponse.json(res);
  }
);
