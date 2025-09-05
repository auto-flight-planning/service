import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import {
  daySchema,
  totalFlightCntSchema,
  totalRevenueSchema,
  flightIdSchema,
  departureTimeSchema,
  revenueSchema,
} from "./common/common.schema";
import { airportPointSchema } from "./common/airport.schema";
import {
  prioritySchema,
  priorityNormChartDataSchema,
} from "./common/priority.schema";

extendZodWithOpenApi(z);

// part
const boundDataSchema = z.object({
  id: flightIdSchema,
  departure_time: departureTimeSchema,
  departure_point: airportPointSchema.openapi({
    description: "出発空港情報",
  }),
  arrival_point: airportPointSchema.openapi({
    description: "到着空港情報",
  }),
  priority: prioritySchema.openapi({
    description: "運航優先順位情報",
  }),
  revenue: revenueSchema,
});

const dailyDataItemSchema = z.object({
  day: daySchema,
  total_flight_cnt: totalFlightCntSchema,
  total_revenue: totalRevenueSchema,
  departure_data: z.array(boundDataSchema).openapi({
    description: "往路運航一覧",
  }),
  arrival_data: z.array(boundDataSchema).openapi({
    description: "復路運航一覧",
  }),
  priority_norm_chart_data: priorityNormChartDataSchema.openapi({
    description: "優先順位チャートデータ",
  }),
});

// main
export const planResultDailyDataSchema = z.object({
  plan_id: planIdSchema,
  data: z.array(dailyDataItemSchema).openapi({
    description: "日別データ",
  }),
});

// Dto
export type PlanResultDailyDataDto = z.infer<typeof planResultDailyDataSchema>;
export type BoundDataDto = z.infer<typeof boundDataSchema>;
export type DailyDataItemDto = z.infer<typeof dailyDataItemSchema>;
