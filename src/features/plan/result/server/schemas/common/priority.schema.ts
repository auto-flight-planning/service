import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export enum PriorityGroupEnum {
  TOP = "top",
  MIDDLE = "middle",
  BOTTOM = "bottom",
}

export const prioritySchema = z.object({
  group: z.enum(PriorityGroupEnum).openapi({
    description: "優先順位グループ",
    example: "top",
  }),
  value: z.number().min(0).max(100).openapi({
    description: "優先順位",
    example: 97.4563118,
  }),
});

export const priorityNormChartDataSchema = z.object({
  top: z.number().int().min(0).max(100).openapi({
    description: "上位優先順位割合 (%)",
    example: 68,
  }),
  middle: z.number().int().min(0).max(100).openapi({
    description: "中位優先順位割合 (%)",
    example: 24,
  }),
  bottom: z.number().int().min(0).max(100).openapi({
    description: "下位優先順位割合 (%)",
    example: 8,
  }),
});

export type PriorityDto = z.infer<typeof prioritySchema>;
export type PriorityNormChartDataDto = z.infer<
  typeof priorityNormChartDataSchema
>;
