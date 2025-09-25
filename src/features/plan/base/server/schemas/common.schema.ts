import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { planStatusSchema } from "@/features/plan/status/server/schemas/common.schema";
import { UUID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

// 1. 個別スキーマ
export const planCreatorIdSchema = z.uuid().openapi({
  description: "計画生成者(責任者)のID",
  example: UUID_EXAMPLE,
});
export type PlanCreatorIdSchema = z.infer<typeof planCreatorIdSchema>;

export const planTitleSchema = z.string().min(1).openapi({
  description: "計画名",
  example: "2028年9月運航計画",
});
export type PlanTitleSchema = z.infer<typeof planTitleSchema>;

export const planTargetDateSchema = z
  .string()
  .refine(
    (dateStr) => {
      const inputDate = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate >= today;
    },
    {
      message: "対象年月は今日以降の日付である必要があります",
    }
  )
  .openapi({
    description: "対象年月 (YYYY-MM-DD 形式, 今日以降)",
    example: "2028-09-01",
  });
export type PlanTargetDateSchema = z.infer<typeof planTargetDateSchema>;

export const planCreatedAtSchema = z.date().openapi({
  description: "計画作成日時",
  example: new Date(),
});
export type PlanCreatedAtSchema = z.infer<typeof planCreatedAtSchema>;

// 2. オブジェクトスキーマ
export const planSchema = z.object({
  id: planIdSchema,
  creator_id: planCreatorIdSchema,
  title: planTitleSchema,
  target_date: planTargetDateSchema,
  status: planStatusSchema,
  created_at: planCreatedAtSchema,
});
export type PlanSchema = z.infer<typeof planSchema>;
