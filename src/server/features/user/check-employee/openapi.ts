import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { checkEmployeeReqSchema, checkEmployeeResSchema } from "./schema";

export const registerLoginSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/user/check-employee",
    tags: ["User"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: checkEmployeeReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "職員情報を取得しました",
        content: {
          "application/json": {
            schema: checkEmployeeResSchema,
          },
        },
      },
      404: {
        description: "存在しない職員IDです",
      },
    },
  });
};
