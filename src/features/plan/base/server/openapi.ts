import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createPlanReqSchema } from "./schemas/req.schema";
import { createPlanResSchema } from "./schemas/res.schema";

export const registerPlanAPIsToDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/plans",
    tags: ["Plan"],
    summary: "新規企画を作成",
    security: [{ BearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: createPlanReqSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "企画を作成しました",
        content: {
          "application/json": {
            schema: createPlanResSchema,
          },
        },
      },
      400: {
        description: "不正なリクエストです",
      },
      401: {
        description: "認証が必要です",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
    },
  });
};
