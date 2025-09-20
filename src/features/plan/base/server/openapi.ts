import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { planSchema } from "./schemas/common.schema";
import {
  createPlanReqSchema,
  updatePlanTitleReqSchema,
} from "./schemas/req.schema";
import { createPlanResSchema } from "./schemas/res.schema";
import { commonOpenApiResponses } from "@/server/lib/helpers";

export const registerPlanAPIsToDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/plans",
    tags: ["Plan"],
    summary: "新規計画を作成",
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
        description: "計画を作成しました",
        content: {
          "application/json": {
            schema: createPlanResSchema,
          },
        },
      },
      ...commonOpenApiResponses({ auth: true }),
    },
  });

  registry.registerPath({
    method: "get",
    path: "/api/plans/{planId}",
    tags: ["Plan"],
    summary: "計画をplanIdで取得",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
    },
    responses: {
      200: {
        description: "計画を取得しました",
        content: {
          "application/json": {
            schema: planSchema,
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
    path: "/api/plans/{planId}/title",
    tags: ["Plan"],
    summary: "計画のタイトルを変更",
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
        description: "計画のタイトルを変更しました",
        content: {
          "application/json": {
            schema: planSchema,
          },
        },
      },
      ...commonOpenApiResponses({
        auth: true,
        planNotFound: true,
        permission: true,
        permissionType: "CREATOR",
      }),
    },
  });
};
