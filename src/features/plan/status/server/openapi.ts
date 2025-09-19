import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { getPlanInputsStatusResSchema } from "./schemas/res.schema";

export const registerPlanStatusAPIsToDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/plans/{planId}/status/input",
    tags: ["Plan Status"],
    summary: "企画入力データのステータスをplanIdで取得",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
    },
    responses: {
      200: {
        description: "企画入力データのステータスを取得しました",
        content: {
          "application/json": {
            schema: getPlanInputsStatusResSchema,
          },
        },
      },
      400: {
        description: "パースに失敗しました。",
      },
      401: {
        description: "認証が必要です",
      },
      403: {
        description: "使用権限ないユーザーです",
      },
      404: {
        description: "企画の情報が見つかりません",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
    },
  });
};
