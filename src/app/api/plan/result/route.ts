// export { GET } from "@/features/plan/result/server/createPlanResult/route";

import { PlanResultService } from "@/features/plan/result/server/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const planResultService = new PlanResultService();
  await planResultService.createPlanResult("dd");

  return NextResponse.json({ message: "Test" });
}
