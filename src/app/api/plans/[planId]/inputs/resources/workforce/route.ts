import { NextRequest, NextResponse } from "next/server";
import planInputsResourcesWorkforceRepo from "@/server/repos/plans/inputs/resources/workforce.repo";
import planInputService from "@/features/plan/input/servers/service";
import camelcaseKeys from "camelcase-keys";
import { type User } from "@supabase/supabase-js";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { workforceSchema } from "@/features/plan/input/servers/schemas/common.schema";
import { APIWrapper, doPlanCheck, findOrThrow } from "@/server/lib/helpers";

export const GET = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "VIEW" } },
    });

    const planWorkforce = await findOrThrow(
      () => planInputsResourcesWorkforceRepo.findOne({ planId }),
      "自社資源データの総人員データが見つかりません"
    );
    const { plan_id, ...workforceData } = planWorkforce!;

    const res = workforceSchema.parse(workforceData);
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);

export const PUT = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const requestBody = await request.json();
    const validatedRequestBody = workforceSchema.parse(requestBody);

    await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "INPUT" } },
    });

    const camelcaseRequestBody = camelcaseKeys(validatedRequestBody, {
      deep: true,
    });
    const updatedWorkforce = await planInputService.updateWorkforce({
      planId,
      workforceData: camelcaseRequestBody,
    });

    const res = workforceSchema.parse(updatedWorkforce);
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
