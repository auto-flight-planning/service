import { NextRequest, NextResponse } from "next/server";
import planInputsStatusRepo from "@/server/repos/plans/status/plan-inputs-status.repo";
import { type User } from "@supabase/supabase-js";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { getPlanInputsStatusResSchema } from "@/features/plan/status/server/schemas/res.schema";
import { APIWrapper, doPlanCheck, findOrThrow } from "@/server/lib/helpers";

export const GET = APIWrapper(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "VIEW" } },
    });

    const planInputsStatus = await findOrThrow(
      () => planInputsStatusRepo.findOne({ planId }),
      "計画入力データのステータスが見つかりません"
    );

    const res = getPlanInputsStatusResSchema.parse(planInputsStatus);
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
