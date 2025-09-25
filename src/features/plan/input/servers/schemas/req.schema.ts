import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  flightScaleIdSchema,
  flightScaleNameSchema,
  flightScaleSchema,
} from "./common.schema";

extendZodWithOpenApi(z);

export const updateFlightScalesReqSchema = z.object({
  add_flight_scale_names: z.array(flightScaleNameSchema),
  flight_scales_to_update: flightScaleSchema,
  remove_flight_scale_ids: z.array(flightScaleIdSchema),
});
export type UpdateFlightScalesReqSchema = z.infer<
  typeof updateFlightScalesReqSchema
>;
