import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/server/db/prismaClient";
import { checkRequestBody, withErrorHandler } from "@/server/lib";
import {
  updateFlightScaleResourceInputReqSchema,
  updateTotalPersonResourceInputReqSchema,
} from "./schema";

export const TotalPersonPOST = withErrorHandler(async (req: NextRequest) => {
  const parsed = await checkRequestBody(
    req,
    updateTotalPersonResourceInputReqSchema
  );
  if (!parsed.success) return parsed.response;

  const { planId, pilot_cnt, second_pilot_cnt, total_person_exponent } =
    parsed.data;

  const updatedPlan = await prismaClient.plan_resource_input.update({
    where: { plan_id: planId },
    data: {
      pilot_cnt,
      second_pilot_cnt,
      total_person_exponent,
    },
  });

  const {
    pilot_cnt: updatedPilotCnt,
    second_pilot_cnt: updatedSecondPilotCnt,
    total_person_exponent: updatedTotalPersonExponent,
  } = updatedPlan;
  // totalPerson 입력 상태 계산
  const totalPersonValues = [
    updatedPilotCnt,
    updatedSecondPilotCnt,
    updatedTotalPersonExponent,
  ];
  const hasAnyInput = totalPersonValues.some((value) => value !== null);
  const hasAllInputs = totalPersonValues.every((value) => value !== null);

  let totalPersonInputStatus: string;
  if (!hasAnyInput) {
    totalPersonInputStatus = "empty";
  } else if (hasAllInputs) {
    totalPersonInputStatus = "submitted";
  } else {
    totalPersonInputStatus = "inputting";
  }

  const beforeInputStatus = await prismaClient.plan_status.findUnique({
    where: { plan_id: planId },
  });

  if (!beforeInputStatus) {
    return NextResponse.json(
      { error: "Plan status not found" },
      { status: 404 }
    );
  }

  const beforeInputStatusResourceData =
    beforeInputStatus.input_status as Record<string, unknown>;
  const beforeInputStatusResourceDataResourceData =
    beforeInputStatusResourceData.resource_data as Record<string, unknown>;

  await prismaClient.plan_status.update({
    where: { plan_id: planId },
    data: {
      input_status: {
        ...beforeInputStatusResourceData,
        resource_data: {
          ...beforeInputStatusResourceDataResourceData,
          total_person_resource_data: totalPersonInputStatus,
        },
      },
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
});

export const FlightScalePOST = withErrorHandler(async (req: NextRequest) => {
  const parsed = await checkRequestBody(
    req,
    updateFlightScaleResourceInputReqSchema
  );
  if (!parsed.success) return parsed.response;

  const { planId, flight_scale_types } = parsed.data;

  const updatedPlan = await prismaClient.plan_resource_input.update({
    where: { plan_id: planId },
    data: {
      flight_scale_types:
        flight_scale_types.length === 0 ? [] : flight_scale_types,
    },
  });

  const updatedFlightScaleTypes = updatedPlan.flight_scale_types;
  const totalFlightScaleTypes =
    (updatedFlightScaleTypes?.length ?? 0) === 0 ? "empty" : "submitted";

  const beforeInputStatus = await prismaClient.plan_status.findUnique({
    where: { plan_id: planId },
  });

  if (!beforeInputStatus) {
    return NextResponse.json(
      { error: "Plan status not found" },
      { status: 404 }
    );
  }

  const beforeInputStatusResourceData =
    beforeInputStatus.input_status as Record<string, unknown>;
  const beforeInputStatusResourceDataResourceData =
    beforeInputStatusResourceData.resource_data as Record<string, unknown>;

  await prismaClient.plan_status.update({
    where: { plan_id: planId },
    data: {
      input_status: {
        ...beforeInputStatusResourceData,
        resource_data: {
          ...beforeInputStatusResourceDataResourceData,
          flight_scale_data: totalFlightScaleTypes,
        },
      },
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
});
