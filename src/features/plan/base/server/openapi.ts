import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { planSchema } from "./schemas/common.schema";
import {
  createPlanReqSchema,
  updatePlanTitleReqSchema,
} from "./schemas/req.schema";
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
        description: "パースに失敗しました。",
      },
      401: {
        description: "認証が必要です",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
    },
  });

  registry.registerPath({
    method: "get",
    path: "/api/plans/{planId}",
    tags: ["Plan"],
    summary: "企画をplanIdで取得",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
    },
    responses: {
      200: {
        description: "企画を取得しました",
        content: {
          "application/json": {
            schema: planSchema,
          },
        },
      },
      400: {
        description: "パースに失敗しました。",
      },
      401: {
        description: "認証が必要です",
      },
      404: {
        description: "企画が見つかりません",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
    },
  });

  registry.registerPath({
    method: "put",
    path: "/api/plans/{planId}/title",
    tags: ["Plan"],
    summary: "企画のタイトルを変更",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
      body: {
        content: {
          "application/json": {
            schema: updatePlanTitleReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "企画のタイトルを更新しました",
        content: {
          "application/json": {
            schema: planSchema,
          },
        },
      },
      400: {
        description: "パースに失敗しました。",
      },
      401: {
        description: "認証が必要です",
      },
      404: {
        description: "企画が見つかりません",
      },
      405: {
        description: "メソッドが許可されていません",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
    },
  });
};
