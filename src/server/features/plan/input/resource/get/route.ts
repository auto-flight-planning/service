import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/server/db/prismaClient";
import { withErrorHandler } from "@/server/utils";
import { getTotalPersonResourceInputResSchema } from "./schema";

export const TotalPersonGET = withErrorHandler(async (req: NextRequest) => {
  const planId = req.nextUrl.searchParams.get("planId");
  if (!planId) {
    return NextResponse.json(
      { error: "プランIDを入力してください" },
      { status: 400 }
    );
  }

  const totalPerson = await prismaClient.plan_resource_input.findUnique({
    where: {
      plan_id: planId,
    },
  });

  if (!totalPerson) {
    return NextResponse.json(
      { error: "総人員データが見つかりません" },
      { status: 404 }
    );
  }

  const res = getTotalPersonResourceInputResSchema.parse({
    pilot_cnt: totalPerson.pilot_cnt,
    second_pilot_cnt: totalPerson.second_pilot_cnt,
    total_person_exponent:
      totalPerson.total_person_exponent !== null
        ? Number(totalPerson.total_person_exponent)
        : null,
  });

  return NextResponse.json(res, { status: 200 });
});
