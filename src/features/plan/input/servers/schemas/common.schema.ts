import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { numberAndBigintSchema } from "@/lib/schema";
import { UUID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const captainCntSchema = numberAndBigintSchema
  .nullable()
  .optional()
  .openapi({
    description: "総機長数",
    example: 20,
  });

export const subCaptainCntSchema = numberAndBigintSchema
  .nullable()
  .optional()
  .openapi({
    description: "総副操縦士数",
    example: 30,
  });

export const otherPersonnelNormSchema = numberAndBigintSchema
  .nullable()
  .optional()
  .openapi({
    description: "その他総人員指数",
    example: 50_000,
  });

export const workforceSchema = z.object({
  captain_cnt: captainCntSchema,
  sub_captain_cnt: subCaptainCntSchema,
  other_personnel_norm: otherPersonnelNormSchema,
});
export type WorkforceSchema = z.infer<typeof workforceSchema>;

export const flightScaleIdSchema = z.uuid().openapi({
  description: "運航規模種類ID",
  example: UUID_EXAMPLE,
});
export const flightScaleNameSchema = z.string().openapi({
  description: "運航規模種類名",
  example: "小型機",
});
export const flightScaleSchema = z.array(
  z.object({
    id: flightScaleIdSchema,
    flight_scale_name: flightScaleNameSchema,
  })
);
export type FlightScaleSchema = z.infer<typeof flightScaleSchema>;
