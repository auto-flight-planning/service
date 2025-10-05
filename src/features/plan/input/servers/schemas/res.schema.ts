import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { flightScaleDataWithIdSchema } from "./common.schema";

extendZodWithOpenApi(z);

export const flightScaleDataResSchema = z.object({
  plan_id: planIdSchema,
  flight_scale_datas: z.array(flightScaleDataWithIdSchema),
});
export type FlightScaleDataResSchema = z.infer<typeof flightScaleDataResSchema>;
