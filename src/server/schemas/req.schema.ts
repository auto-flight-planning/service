import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { PLAN_ID_EXAMPLE, USER_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const userIdPathReqSchema = z.object({
  userId: z.uuid().openapi({
    param: {
      name: "userId",
      in: "path",
    },
    description: "ユーザーID",
    example: USER_ID_EXAMPLE,
  }),
});

export const planIdPathReqSchema = z.object({
  planId: z.uuid().openapi({
    param: {
      name: "planId",
      in: "path",
    },
    description: "企画ID",
    example: PLAN_ID_EXAMPLE,
  }),
});

export type UserIdPathReqSchema = z.infer<typeof userIdPathReqSchema>;
export type PlanIdPathReqSchema = z.infer<typeof planIdPathReqSchema>;
