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

export const registerEmployeeSchemas = (registry: OpenAPIRegistry) => {
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
      400: {
        description: "不正なリクエストです",
      },
      404: {
        description: "職員が見つかりません",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
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
      400: {
        description: "不正なリクエストです",
      },
      401: {
        description: "認証が必要です",
      },
      404: {
        description: "職員が見つかりません",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
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
      401: {
        description: "認証が必要です",
      },
      500: {
        description: "サーバーエラーが発生しました",
      },
    },
  });
};
