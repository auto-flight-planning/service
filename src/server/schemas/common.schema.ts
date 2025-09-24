import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { PLAN_ID_EXAMPLE, USER_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const userIdSchema = z.uuid().openapi({
  description: "ユーザーID",
  example: USER_ID_EXAMPLE,
});
export type UserIdSchema = z.infer<typeof userIdSchema>;

export const planIdSchema = z.uuid().openapi({
  description: "計画ID",
  example: PLAN_ID_EXAMPLE,
});
export type PlanIdSchema = z.infer<typeof planIdSchema>;

// zod
export const numberAndBigint = z
  .union([z.bigint(), z.number()])
  .transform((val) => (typeof val === "number" ? BigInt(val) : Number(val)));
