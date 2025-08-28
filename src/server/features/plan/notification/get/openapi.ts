import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { getNotificationReqSchema, getNotificationResSchema } from "./schema";

export const registerGetNotificationSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/plan/notification/get",
    tags: ["Plan"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: getNotificationReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "企画を作成しました",
        content: {
          "application/json": {
            schema: getNotificationResSchema,
          },
        },
      },
    },
  });
};
