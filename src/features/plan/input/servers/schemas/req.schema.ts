import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  flightScaleDataSchema,
  flightScaleDataWithIdSchema,
  flightScaleIdSchema,
} from "./common.schema";

extendZodWithOpenApi(z);

export const updateFlightScaleDataReqSchema = z.object({
  add_flight_scale_datas: z.array(flightScaleDataSchema),
  update_flight_scale_datas: z.array(flightScaleDataWithIdSchema),
  remove_flight_scale_data_ids: z.array(flightScaleIdSchema),
});
export type UpdateFlightScaleDataReqSchema = z.infer<
  typeof updateFlightScaleDataReqSchema
>;
