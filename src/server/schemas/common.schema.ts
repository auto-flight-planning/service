import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { PLAN_ID_EXAMPLE, USER_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const userIdSchema = z.uuid().openapi({
  description: "ユーザーID",
  example: USER_ID_EXAMPLE,
});

export const planIdSchema = z.uuid().openapi({
  description: "企画ID",
  example: PLAN_ID_EXAMPLE,
});

export type UserIdSchema = z.infer<typeof userIdSchema>;
export type PlanIdSchema = z.infer<typeof planIdSchema>;
