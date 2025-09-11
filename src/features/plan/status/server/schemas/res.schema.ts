import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { StatusEnum } from "./common.schema";
import { planIdSchema } from "@/server/schemas/common.schema";

extendZodWithOpenApi(z);

export const getPlanInputsStatusResSchema = z.object({
  planId: planIdSchema,
  resourcesWorkforceStatus: z.enum(StatusEnum),
  resourcesFlightScalesStatus: z.boolean(),
  resourcesFlightScaleDataStatus: z.enum(StatusEnum),
  analyticsFlightCandidatesStatus: z.enum(StatusEnum),
  analyticsRoundTripNormalizationStatus: z.boolean(),
  analyticsMinDistributionCriteriaStatus: z.boolean(),
  airportsScheduleDataStatus: z.enum(StatusEnum),
});
export type GetPlanInputsStatusResSchema = z.infer<
  typeof getPlanInputsStatusResSchema
>;
