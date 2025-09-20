import { NextRequest, NextResponse } from "next/server";
import { type User } from "@supabase/supabase-js";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { planSchema } from "@/features/plan/base/server/schemas/common.schema";
import { APIWrapper, doPlanCheck } from "@/server/lib/helpers";
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

    const { target_date, ...rest } = plan;
    const res = planSchema.parse({
      ...rest,
      target_date: dateToString(target_date),
    });
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
