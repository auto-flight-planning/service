import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { numberAndBigintSchema } from "@/lib/schema";
import { UUID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

// workforce
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

// flight scale
export const flightScaleIdSchema = z.uuid().openapi({
  description: "運航規模種類ID",
  example: UUID_EXAMPLE,
});
export const flightScaleNameSchema = z.string().optional().openapi({
  description: "運航規模種類名",
  example: "小型機",
});
export const flightScaleIndexSchema = z.number().optional().openapi({
  description: "インデックス",
  example: 1,
});
export const flightScaleAirplaneCntSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "総運航機数",
    example: 10,
  });
export const flightScaleMinStandbyAirplaneCntSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "最小待機運航機数",
    example: 1,
  });
export const flightScaleSeatCntSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "座席数",
    example: 1,
  });
export const flightScaleRequiredCaptainCntSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "必要機長数",
    example: 1,
  });
export const flightScaleRequiredSubCaptainCntSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "必要副操縦士数",
    example: 1,
  });
export const flightScaleRequiredOtherPersonnelNormSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "その他必要人員指数",
    example: 1,
  });
export const flightScaleRequiredPreFlightHoursSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "飛行前必要時間",
    example: 1,
  });
export const flightScaleRequiredPostFlightHoursSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "飛行後必要時間",
    example: 1,
  });
export const flightScaleMinRequiredRevenueSchema = z
  .number()
  .nullable()
  .optional()
  .openapi({
    description: "運航可能最小収益",
    example: 1,
  });

export const flightScaleDataSchema = z.object({
  name: flightScaleNameSchema,
  index: flightScaleIndexSchema,
  airplane_cnt: flightScaleAirplaneCntSchema,
  min_standby_airplane_cnt: flightScaleMinStandbyAirplaneCntSchema,
  seat_cnt: flightScaleSeatCntSchema,
  required_captain_cnt: flightScaleRequiredCaptainCntSchema,
  required_sub_captain_cnt: flightScaleRequiredSubCaptainCntSchema,
  required_other_personnel_norm: flightScaleRequiredOtherPersonnelNormSchema,
  required_pre_flight_hours: flightScaleRequiredPreFlightHoursSchema,
  required_post_flight_hours: flightScaleRequiredPostFlightHoursSchema,
  min_required_revenue: flightScaleMinRequiredRevenueSchema,
});
export type FlightScaleDataSchema = z.infer<typeof flightScaleDataSchema>;

export const flightScaleDataWithIdSchema = flightScaleDataSchema.extend({
  id: flightScaleIdSchema,
});
export type FlightScaleDataWithIdSchema = z.infer<
  typeof flightScaleDataWithIdSchema
>;
