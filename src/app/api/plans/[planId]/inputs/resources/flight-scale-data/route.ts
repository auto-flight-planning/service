import { NextRequest, NextResponse } from "next/server";
import planInputsResourcesFlightScaleDataRepo from "@/server/repos/plans/inputs/resources/flight-scale-data.repo";
import planInputService from "@/features/plan/input/servers/service";
import camelcaseKeys from "camelcase-keys";
import { type User } from "@supabase/supabase-js";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { updateFlightScaleDataReqSchema } from "@/features/plan/input/servers/schemas/req.schema";
import {
  getFlightScaleDataResSchema,
  updateFlightScaleDataResSchema,
} from "@/features/plan/input/servers/schemas/res.schema";
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

    const flightScaleDatas = await findOrThrow(
      () => planInputsResourcesFlightScaleDataRepo.findAllByPlanId({ planId }),
      "運航規模の種類データが見つかりません"
    );

    const res = getFlightScaleDataResSchema.parse(
      flightScaleDatas.map(({ plan_id, ...rest }) => rest)
    );
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
    const validatedRequestBody =
      updateFlightScaleDataReqSchema.parse(requestBody);

    await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "INPUT" } },
    });

    const camelcaseRequestBody = camelcaseKeys(validatedRequestBody, {
      deep: true,
    });
    const updatedFlightScaleDatas =
      await planInputService.updateFlightScaleDatas({
        planId,
        flightScaleDatas: camelcaseRequestBody,
      });

    const res = updateFlightScaleDataResSchema.parse({
      plan_id: planId,
      flight_scale_datas: updatedFlightScaleDatas.map(
        ({ plan_id, ...rest }) => rest
      ),
    });
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
