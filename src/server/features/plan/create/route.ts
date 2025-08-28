import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler, checkRequestBody } from "@/server/utils";
import { createPlanReqSchema, createPlanResSchema } from "./schema";
import { prismaClient } from "@/server/db/prismaClient";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const parsed = await checkRequestBody(req, createPlanReqSchema);
  if (!parsed.success) return parsed.response;

  const { userId, name, year, month, participant_ids } = parsed.data;

  const plan = await prismaClient.plan_list.create({
    data: {
      creator_id: userId,
      name,
      year,
      month,
      participant_ids,
    },
  });

  const res = createPlanResSchema.parse({
    planId: plan.id,
    creatorId: plan.creator_id,
    name: plan.name,
    year: plan.year,
    month: plan.month,
    participant_ids: plan.participant_ids,
  });

  return NextResponse.json(res, { status: 200 });
});
