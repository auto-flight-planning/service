import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { UUID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const userIdSchema = z.uuid().openapi({
  description: "ユーザーID",
  example: UUID_EXAMPLE,
});
export type UserIdSchema = z.infer<typeof userIdSchema>;

export const planIdSchema = z.uuid().openapi({
  description: "計画ID",
  example: UUID_EXAMPLE,
});
export type PlanIdSchema = z.infer<typeof planIdSchema>;
