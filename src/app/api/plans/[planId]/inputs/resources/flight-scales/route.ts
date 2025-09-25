import { NextRequest, NextResponse } from "next/server";
import planInputsResourcesFlightScalesRepo from "@/server/repos/plans/inputs/resources/flight-scales.repo";
import planInputService from "@/features/plan/input/servers/service";
import camelcaseKeys from "camelcase-keys";
import { type User } from "@supabase/supabase-js";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { updateFlightScalesReqSchema } from "@/features/plan/input/servers/schemas/req.schema";
import { flightScalesResSchema } from "@/features/plan/input/servers/schemas/res.schema";
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

    const flightScales = await findOrThrow(
      () => planInputsResourcesFlightScalesRepo.findAllByPlanId({ planId }),
      "運航規模の種類データが見つかりません"
    );

    const res = flightScalesResSchema.parse({
      plan_id: planId,
      flight_scales: flightScales.map(({ plan_id, ...rest }) => rest),
    });
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
    const validatedRequestBody = updateFlightScalesReqSchema.parse(requestBody);

    await doPlanCheck({
      checkList: ["exists", "permission"],
      data: { planId, user, permissionCheckOptions: { type: "INPUT" } },
    });

    const camelcaseRequestBody = camelcaseKeys(validatedRequestBody, {
      deep: true,
    });
    const updatedFlightScales = await planInputService.updateFlightScales({
      planId,
      flightScales: camelcaseRequestBody,
    });

    const res = flightScalesResSchema.parse({
      plan_id: planId,
      flight_scales: updatedFlightScales.map(({ plan_id, ...rest }) => rest),
    });
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
