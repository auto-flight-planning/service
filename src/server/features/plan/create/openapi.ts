import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createPlanReqSchema, createPlanResSchema } from "./schema";

export const registerCreatePlanSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/plan/create",
    tags: ["Plan"],
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
      200: {
        description: "企画を作成しました",
        content: {
          "application/json": {
            schema: createPlanResSchema,
          },
        },
      },
    },
  });
};
