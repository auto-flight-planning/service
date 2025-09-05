import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { getPlanOneReqSchema, getPlanOneResSchema } from "./schema";

export const registerGetPlanOneSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/plan/get/one",
    tags: ["Plan"],
    request: {
      query: getPlanOneReqSchema,
    },
    responses: {
      200: {
        description: "プランを取得しました",
        content: {
          "application/json": {
            schema: getPlanOneResSchema,
          },
        },
      },
      400: {
        description: "プランIDを入力してください",
      },
      404: {
        description: "プランが見つかりません",
      },
    },
  });
};
