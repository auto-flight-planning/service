import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import {
  daySchema,
  revenueSchema,
  flightIdSchema,
  departureTimeSchema,
} from "../common/common.schema";
import { airportPointSchema } from "../common/airport.schema";
import { prioritySchema } from "../common/priority.schema";

extendZodWithOpenApi(z);

export enum FlightDirectionEnum {
  DEPARTURE = "departure",
  ARRIVAL = "arrival",
}

// main
export const planResultFlightsDataSchema = z.object({
  id: flightIdSchema,
  plan_id: planIdSchema,
  day: daySchema,
  direction: z.enum(FlightDirectionEnum).openapi({
    description: "運航方向",
    example: "departure",
  }),
  departure: airportPointSchema.openapi({
    description: "出発空港情報",
  }),
  arrival: airportPointSchema.openapi({
    description: "到着空港情報",
  }),
  departure_time: departureTimeSchema,
  flight_minutes: z.number().int().min(0).openapi({
    description: "飛行時間 (分)",
    example: 120,
  }),
  recommend_max_flight_cnt: z.number().int().min(0).openapi({
    description: "推奨最大運航数",
    example: 5,
  }),
  priority: prioritySchema.openapi({
    description: "運航優先順位情報",
  }),
  revenue: revenueSchema,
  ticket_price: z.number().int().min(0).openapi({
    description: "チケット価格 (円)",
    example: 10_000,
  }),
  demand: z.number().int().min(0).openapi({
    description: "需要 (名)",
    example: 200,
  }),
  flight_scale: z.string().openapi({
    description: "運航規模",
    example: "小規模運航",
  }),
  seat_cnt: z.number().int().min(0).openapi({
    description: "座席数",
    example: 200,
  }),
  required_captain_cnt: z.number().int().min(0).openapi({
    description: "必要機長数",
    example: 1,
  }),
  required_sub_captain_cnt: z.number().int().min(0).openapi({
    description: "必要副操縦士数",
    example: 1,
  }),
  required_other_personnel_norm: z.number().int().min(0).openapi({
    description: "その他必要人員指数",
    example: 10,
  }),
  required_pre_flight_hours: z.number().int().min(0).openapi({
    description: "飛行前必要時間 (時間)",
    example: 5,
  }),
  required_post_flight_hours: z.number().int().min(0).openapi({
    description: "飛行後必要時間 (時間)",
    example: 3,
  }),
  min_required_revenue: z.number().int().min(0).openapi({
    description: "運航可能な最小収益 (円)",
    example: 150_000,
  }),
  opposite_flight_id: flightIdSchema,
});

// Dto
export type PlanResultFlightsData = z.infer<typeof planResultFlightsDataSchema>;
