import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { UUID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const userIdReqSchema = (type: "path" | "query") =>
  z.object({
    userId: z.uuid().openapi({
      param: {
        name: "userId",
        in: type,
      },
      description: "ユーザーID",
      example: UUID_EXAMPLE,
    }),
  });

export const planIdReqSchema = (type: "path" | "query") =>
  z.object({
    planId: z.uuid().openapi({
      param: {
        name: "planId",
        in: type,
      },
      description: "計画ID",
      example: UUID_EXAMPLE,
    }),
  });
