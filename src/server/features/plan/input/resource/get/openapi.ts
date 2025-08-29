import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  getTotalPersonResourceInputReqSchema,
  getTotalPersonResourceInputResSchema,
} from "./schema";

export const registerGetTotalPersonResourceSchemas = (
  registry: OpenAPIRegistry
) => {
  registry.registerPath({
    method: "get",
    path: "/api/plan/input/resource/get/total-person",
    tags: ["Plan/Input"],
    request: {
      query: getTotalPersonResourceInputReqSchema,
    },
    responses: {
      200: {
        description: "総人員データを取得しました",
        content: {
          "application/json": {
            schema: getTotalPersonResourceInputResSchema,
          },
        },
      },
      400: {
        description: "プランIDを入力してください",
      },
      404: {
        description: "総人員データが見つかりません",
      },
    },
  });
};
