import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import {
  getPlanParticipantsResSchema,
  updatePlanParticipantsResSchema,
} from "./schemas/res.schema";
import { updateParticipantsReqSchema } from "./schemas/req.schema";
import { commonOpenApiResponses } from "@/server/lib/helpers/openapi-helpers";

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
      ...commonOpenApiResponses({
        auth: true,
        planNotFound: true,
        permission: true,
        permissionType: "CREATOR",
      }),
    },
  });
};
