import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { getEmployeeReqSchema, getEmployeeResSchema } from "./schema";

export const registerGetEmployeeSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/auth/get-employee",
    tags: ["Auth"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: getEmployeeReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "職員情報を取得しました",
        content: {
          "application/json": {
            schema: getEmployeeResSchema,
          },
        },
      },
      404: {
        description: "存在しないユーザーIDです",
      },
    },
  });
};
