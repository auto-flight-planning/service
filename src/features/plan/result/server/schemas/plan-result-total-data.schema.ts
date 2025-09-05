import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import {
  daySchema,
  totalFlightCntSchema,
  totalRevenueSchema,
} from "./common/common.schema";
import { priorityNormChartDataSchema } from "./common/priority.schema";

extendZodWithOpenApi(z);

// part
const monthlyDataItemSchema = z.object({
  day: daySchema,
  total_flight_cnt: totalFlightCntSchema,
  total_revenue: totalRevenueSchema,
});

// main
export const planResultTotalDataSchema = z.object({
  plan_id: planIdSchema,
  total_flight_cnt: totalFlightCntSchema,
  total_revenue: totalRevenueSchema,
  monthly_data: z.array(monthlyDataItemSchema).openapi({
    description: "日別要約データ",
  }),
  priority_norm_chart_data: priorityNormChartDataSchema.openapi({
    description: "優先順位チャートデータ",
  }),
});

// Dto
export type PlanResultTotalDataDto = z.infer<typeof planResultTotalDataSchema>;
export type MonthlyDataItemDto = z.infer<typeof monthlyDataItemSchema>;
