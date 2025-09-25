import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { flightScaleSchema } from "./common.schema";

extendZodWithOpenApi(z);

export const flightScalesResSchema = z.object({
  plan_id: planIdSchema,
  flight_scales: flightScaleSchema,
});
export type FlightScalesResSchema = z.infer<typeof flightScalesResSchema>;
