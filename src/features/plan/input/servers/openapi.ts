import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { workforceSchema } from "./schemas/common.schema";
import { commonOpenApiResponses } from "@/server/lib/helpers";

export const registerPlanInputAPIsToDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/plans/{planId}/inputs/resources/workforce",
    tags: ["Plan Input"],
    summary: "自社資源データの総人員データをplanIdで取得",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
    },
    responses: {
      200: {
        description: "自社資源データの総人員データを取得しました",
        content: {
          "application/json": {
            schema: workforceSchema,
          },
        },
      },
      ...commonOpenApiResponses({
        auth: true,
        planNotFound: true,
        permission: true,
        permissionType: "VIEW",
      }),
    },
  });

  registry.registerPath({
    method: "put",
    path: "/api/plans/{planId}/inputs/resources/workforce",
    tags: ["Plan Input"],
    summary: "自社資源データの総人員データを変更",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
      body: {
        content: {
          "application/json": {
            schema: workforceSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "リソス入力を更新しました",
        content: {
          "application/json": {
            schema: workforceSchema,
          },
        },
      },
      ...commonOpenApiResponses({
        auth: true,
        planNotFound: true,
        permission: true,
        permissionType: "INPUT",
      }),
    },
  });
};
