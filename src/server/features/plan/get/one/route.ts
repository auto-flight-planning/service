import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/server/db/prismaClient";
import { withErrorHandler } from "@/server/utils";
import { getPlanOneResSchema } from "./schema";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const planId = req.nextUrl.searchParams.get("planId");
  if (!planId) {
    return NextResponse.json(
      { error: "プランIDを入力してください" },
      { status: 400 }
    );
  }

  const plan = await prismaClient.plan_list.findUnique({
    where: {
      id: planId,
    },
  });

  if (!plan) {
    return NextResponse.json(
      { error: "プランが見つかりません" },
      { status: 404 }
    );
  }

  const plan_status = await prismaClient.plan_status.findUnique({
    where: {
      plan_id: planId,
    },
  });

  if (!plan_status) {
    return NextResponse.json(
      { error: "プランのステータスが見つかりません" },
      { status: 404 }
    );
  }

  const res = getPlanOneResSchema.parse({
    planId: plan.id,
    planName: plan.name,
    year: plan.year,
    month: plan.month,
    status: {
      step: plan_status.step,
      input_status: plan_status.input_status,
      review_status: plan_status.review_status,
    },
  });

  return NextResponse.json(res, { status: 200 });
});
