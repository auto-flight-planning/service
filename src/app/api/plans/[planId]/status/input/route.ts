import { NextRequest, NextResponse } from "next/server";
import planInputsStatusRepo from "@/server/repos/plans/status/plan-inputs-status.repo";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { getPlanInputsStatusResSchema } from "@/features/plan/status/server/schemas/res.schema";
import { APIWrapper, doPlanCheck, NotFoundError } from "@/server/lib";

export const GET = APIWrapper(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ planId: string }> }
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    await doPlanCheck(["exists"], { planId });

    const planInputsStatus = await planInputsStatusRepo.findOne({ planId });
    if (!planInputsStatus) {
      throw new NotFoundError("企画入力データのステータスが見つかりません");
    }

    const res = getPlanInputsStatusResSchema.parse({
      planId,
      resourcesWorkforceStatus: planInputsStatus.resources_workforce_status,
      resourcesFlightScalesStatus:
        planInputsStatus.resources_flight_scales_status,
      resourcesFlightScaleDataStatus:
        planInputsStatus.resources_flight_scale_data_status,
      analyticsFlightCandidatesStatus:
        planInputsStatus.analytics_flight_candidates_status,
      analyticsRoundTripNormalizationStatus:
        planInputsStatus.analytics_round_trip_normalization_status,
      analyticsMinDistributionCriteriaStatus:
        planInputsStatus.analytics_min_distribution_criteria_status,
      airportsScheduleDataStatus:
        planInputsStatus.airports_schedule_data_status,
    });
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
