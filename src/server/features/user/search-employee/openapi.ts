import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { searchEmployeeReqSchema, searchEmployeeResSchema } from "./schema";

export const registerSearchEmployeeSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/user/search-employee",
    tags: ["User"],
    request: {
      query: searchEmployeeReqSchema,
    },
    responses: {
      200: {
        description: "検索された職員の情報を取得しました",
        content: {
          "application/json": {
            schema: searchEmployeeResSchema,
          },
        },
      },
      400: {
        description: "検索する氏名を入力してください",
      },
    },
  });
};
