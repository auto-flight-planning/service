import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema, userIdSchema } from "@/server/schemas/common.schema";
import { USER_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

// 1. 個別スキーマ
export enum PermissionEnum {
  VIEW = "VIEW",
  REQUEST = "REQUEST",
  INPUT = "INPUT",
  EDIT = "EDIT",
}

export enum PlanStatusEnum {
  INPUT = "INPUT",
  RESULT = "RESULT",
  REVIEW = "REVIEW",
  ADOPTED = "ADOPTED",
}

export const planCreatorIdSchema = z.uuid().openapi({
  description: "企画生成者(責任者)のID",
  example: USER_ID_EXAMPLE,
});
export type PlanCreatorIdSchema = z.infer<typeof planCreatorIdSchema>;

export const planTitleSchema = z.string().min(1).openapi({
  description: "企画名",
  example: "2028年9月運航企画",
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

export const planStatusSchema = z.enum(PlanStatusEnum).openapi({
  description: "企画の進捗ステータス",
  example: "INPUT",
});
export type PlanStatusSchema = z.infer<typeof planStatusSchema>;

export const planCreatedAtSchema = z.date().openapi({
  description: "企画作成日時",
  example: new Date(),
});
export type PlanCreatedAtSchema = z.infer<typeof planCreatedAtSchema>;

export const planParticipantDataListSchema = z.array(
  z.object({
    userId: userIdSchema,
    permission: z.array(z.enum(PermissionEnum)).openapi({
      description: "権限",
      example: ["VIEW", "REQUEST", "INPUT", "EDIT"],
    }),
  })
);
export type PlanParticipantDataListSchema = z.infer<
  typeof planParticipantDataListSchema
>;

// 2. オブジェクトスキーマ
export const planSchema = z.object({
  id: planIdSchema,
  creatorId: planCreatorIdSchema,
  title: planTitleSchema,
  targetDate: planTargetDateSchema,
  status: planStatusSchema,
  createdAt: planCreatedAtSchema,
});
