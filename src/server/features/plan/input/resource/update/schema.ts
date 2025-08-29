import { z } from "zod";

// 1. Total Person
export const updateTotalPersonResourceInputReqSchema = z.object({
  planId: z.uuid(),
  pilot_cnt: z.number().nullable(),
  second_pilot_cnt: z.number().nullable(),
  total_person_exponent: z.number().nullable(),
});

export type UpdateTotalPersonResourceInputReqSchema = z.infer<
  typeof updateTotalPersonResourceInputReqSchema
>;

// 2. Flight Scale
export const updateFlightScaleResourceInputReqSchema = z.object({
  planId: z.uuid(),
  flight_scale_types: z.array(z.string()),
});

export type UpdateFlightScaleResourceInputReqSchema = z.infer<
  typeof updateFlightScaleResourceInputReqSchema
>;

// 3. Per Flight Scale Data
export const updatePerFlightScaleDataResourceInputReqSchema = z.object({
  planId: z.uuid(),
  per_flight_scale_data: z.record(z.string(), z.unknown()),
});

export type UpdatePerFlightScaleDataResourceInputReqSchema = z.infer<
  typeof updatePerFlightScaleDataResourceInputReqSchema
>;

// res
export const updateInputResSchema = z.object({
  success: z.boolean(),
});
export type UpdateInputResSchema = z.infer<typeof updateInputResSchema>;
