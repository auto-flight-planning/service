import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { PLAN_STATUS_VALUES } from "../../type";

extendZodWithOpenApi(z);

export const planStatusSchema = z.enum(PLAN_STATUS_VALUES).openapi({
  description: "計画の進捗ステータス",
  example: "INPUT",
});
export type PlanStatusSchema = z.infer<typeof planStatusSchema>;
