import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const getPlanOneReqSchema = z.object({
  planId: z.uuid().openapi({
    param: {
      name: "planId",
      in: "query",
    },
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
});

export const getPlanOneResSchema = z.object({
  planId: z.uuid(),
  planName: z.string(),
  year: z.number(),
  month: z.number(),
  status: z.object({
    step: z.string(),
    input_status: z.record(z.string(), z.unknown()),
    result_status: z.string().nullable(),
    review_status: z.string().nullable(),
  }),
});

export type GetPlanOneReqSchema = z.infer<typeof getPlanOneReqSchema>;
export type GetPlanOneResSchema = z.infer<typeof getPlanOneResSchema>;
