import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { PLAN_ID_EXAMPLE, USER_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const userIdReqSchema = (type: "path" | "query") =>
  z.object({
    userId: z.uuid().openapi({
      param: {
        name: "userId",
        in: type,
      },
      description: "ユーザーID",
      example: USER_ID_EXAMPLE,
    }),
  });

export const planIdReqSchema = (type: "path" | "query") =>
  z.object({
    planId: z.uuid().openapi({
      param: {
        name: "planId",
        in: type,
      },
      description: "企画ID",
      example: PLAN_ID_EXAMPLE,
    }),
  });

export type UserIdReqSchema = z.infer<typeof userIdReqSchema>;
export type PlanIdReqSchema = z.infer<typeof planIdReqSchema>;
