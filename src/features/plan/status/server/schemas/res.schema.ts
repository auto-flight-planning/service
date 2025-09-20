import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { BASIC_STATUS_VALUES } from "../../type";

extendZodWithOpenApi(z);

export const getPlanInputsStatusResSchema = z.object({
  planId: planIdSchema,
  resourcesWorkforceStatus: z.enum(BASIC_STATUS_VALUES),
  resourcesFlightScalesStatus: z.boolean(),
  resourcesFlightScaleDataStatus: z.enum(BASIC_STATUS_VALUES),
  analyticsFlightCandidatesStatus: z.enum(BASIC_STATUS_VALUES),
  analyticsRoundTripNormalizationStatus: z.boolean(),
  analyticsMinDistributionCriteriaStatus: z.boolean(),
  airportsScheduleDataStatus: z.enum(BASIC_STATUS_VALUES),
});
export type GetPlanInputsStatusResSchema = z.infer<
  typeof getPlanInputsStatusResSchema
>;
