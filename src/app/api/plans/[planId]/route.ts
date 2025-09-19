import { NextRequest, NextResponse } from "next/server";
import { type User } from "@supabase/supabase-js";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { planSchema } from "@/features/plan/base/server/schemas/common.schema";
import { APIWrapper, doPlanCheck } from "@/server/lib";
import { dateToString } from "@/lib/utils";

export const GET = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const { plan: _plan } = await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "VIEW" } },
    });

    const plan = _plan!;
    const res = planSchema.parse({
      id: plan.id,
      creatorId: plan.creator_id,
      title: plan.title,
      targetDate: dateToString(plan.target_date),
      status: plan.status,
      createdAt: plan.created_at,
    });
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
