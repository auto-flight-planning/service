import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userIdReqSchema } from "@/server/schemas/req.schema";
import {
  getEmployeeByIdReqSchema,
  searchEmployeesByNameReqSchema,
} from "./schemas/req.schema";
import {
  getEmployeeByIdResSchema,
  getEmployeeByUserIdResSchema,
  searchEmployeesByNameResSchema,
} from "./schemas/res.schema";
import { commonOpenApiResponses } from "@/server/lib/helpers";

export const registerEmployeeAPIsToDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/employees/{employeeId}",
    tags: ["Employee"],
    summary: "職員情報をemployeeIdで取得",
    request: {
      params: getEmployeeByIdReqSchema,
    },
    responses: {
      200: {
        description: "職員情報を取得しました",
        content: {
          "application/json": {
            schema: getEmployeeByIdResSchema,
          },
        },
      },
      404: {
        description: "職員が見つかりません",
      },
      ...commonOpenApiResponses({}),
    },
  });

  registry.registerPath({
    method: "get",
    path: "/api/employees",
    tags: ["Employee"],
    summary: "職員情報をuserIdで取得",
    security: [{ BearerAuth: [] }],
    request: {
      query: userIdReqSchema("query"),
    },
    responses: {
      200: {
        description: "職員情報を取得しました",
        content: {
          "application/json": {
            schema: getEmployeeByUserIdResSchema,
          },
        },
      },
      404: {
        description: "職員が見つかりません",
      },
      ...commonOpenApiResponses({ auth: true }),
    },
  });

  registry.registerPath({
    method: "get",
    path: "/api/employees/search",
    tags: ["Employee"],
    summary: "職員を氏名で検索",
    security: [{ BearerAuth: [] }],
    request: {
      query: searchEmployeesByNameReqSchema,
    },
    responses: {
      200: {
        description: "検索結果の職員一覧を取得しました",
        content: {
          "application/json": {
            schema: searchEmployeesByNameResSchema,
          },
        },
      },
      ...commonOpenApiResponses({ auth: true }),
    },
  });
};
