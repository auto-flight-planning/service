import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { BASIC_STATUS_VALUES } from "../../type";

extendZodWithOpenApi(z);

export const getPlanInputsStatusResSchema = z.object({
  plan_id: planIdSchema,
  resources_workforce_status: z.enum(BASIC_STATUS_VALUES),
  resources_flight_scales_status: z.boolean(),
  resources_flight_scale_data_status: z.enum(BASIC_STATUS_VALUES),
  analytics_flight_candidates_status: z.enum(BASIC_STATUS_VALUES),
  analytics_round_trip_normalization_status: z.boolean(),
  analytics_min_distribution_criteria_status: z.boolean(),
  airports_schedule_data_status: z.enum(BASIC_STATUS_VALUES),
});
export type GetPlanInputsStatusResSchema = z.infer<
  typeof getPlanInputsStatusResSchema
>;
