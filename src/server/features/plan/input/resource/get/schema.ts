import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// 1. Total Person
export const getTotalPersonResourceInputReqSchema = z.object({
  planId: z.uuid().openapi({
    param: {
      name: "planId",
      in: "query",
    },
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
});

export const getTotalPersonResourceInputResSchema = z.object({
  pilot_cnt: z.number().nullable(),
  second_pilot_cnt: z.number().nullable(),
  total_person_exponent: z.number().nullable(),
});

export type GetTotalPersonResourceInputReqSchema = z.infer<
  typeof getTotalPersonResourceInputReqSchema
>;
export type GetTotalPersonResourceInputResSchema = z.infer<
  typeof getTotalPersonResourceInputResSchema
>;

// 2. Flight Scale

// 3. Per Flight Scale Data
