import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { getEmployeeReqSchema, getEmployeeResSchema } from "./schema";

export const registerGetEmployeeSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/user/get-employee",
    tags: ["User"],
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
