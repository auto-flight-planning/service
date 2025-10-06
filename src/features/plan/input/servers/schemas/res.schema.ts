import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { flightScaleDataWithIdSchema } from "./common.schema";

extendZodWithOpenApi(z);

export const getFlightScaleDataResSchema = z.array(flightScaleDataWithIdSchema);
export type GetFlightScaleDataResSchema = z.infer<
  typeof getFlightScaleDataResSchema
>;

export const updateFlightScaleDataResSchema = z.object({
  plan_id: planIdSchema,
  flight_scale_datas: z.array(flightScaleDataWithIdSchema),
});
export type UpdateFlightScaleDataResSchema = z.infer<
  typeof updateFlightScaleDataResSchema
>;
