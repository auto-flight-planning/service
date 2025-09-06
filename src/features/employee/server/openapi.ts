import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userIdPathReqSchema } from "@/server/schemas/req.schema";
import {
  getEmployeeByIdReqSchema,
  searchEmployeesByNameReqSchema,
} from "./schemas/req.schema";
import {
  getEmployeeResSchema,
  searchEmployeesByNameResSchema,
} from "./schemas/res.schema";

export const registerEmployeeSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/employees/{employeeId}",
    tags: ["Employee"],
    request: {
      params: getEmployeeByIdReqSchema,
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
    path: "/api/employees/{userId}",
    tags: ["Employee"],
    request: {
      params: userIdPathReqSchema,
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
