import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import {
  getPlanParticipantsResSchema,
  updatePlanParticipantsResSchema,
} from "./schemas/res.schema";
import { updateParticipantsReqSchema } from "./schemas/req.schema";

export const registerPlanParticipantsAPIsToDocs = (
  registry: OpenAPIRegistry
) => {
  registry.registerPath({
    method: "get",
    path: "/api/plans/{planId}/participants",
    tags: ["Plan Participant"],
    summary: "企画参加者一覧をplanIdで取得",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
    },
    responses: {
      200: {
        description: "企画参加者一覧を取得しました",
        content: {
          "application/json": {
            schema: getPlanParticipantsResSchema,
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
        description: "企画・生成者・参加者の情報が見つかりません",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
    },
  });

  registry.registerPath({
    method: "put",
    path: "/api/plans/{planId}/participants",
    tags: ["Plan Participant"],
    summary: "企画参加者を変更",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
      body: {
        content: {
          "application/json": {
            schema: updateParticipantsReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "企画参加者を変更しました",
        content: {
          "application/json": {
            schema: updatePlanParticipantsResSchema,
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
        description: "権限がありません",
      },
      404: {
        description: "企画・生成者の情報が見つかりません",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
    },
  });
};
