import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  getFlightScaleResourceInputReqSchema,
  getFlightScaleResourceInputResSchema,
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

export const registerGetFlightScaleResourceSchemas = (
  registry: OpenAPIRegistry
) => {
  registry.registerPath({
    method: "get",
    path: "/api/plan/input/resource/get/flight-scale",
    tags: ["Plan/Input"],
    request: {
      query: getFlightScaleResourceInputReqSchema,
    },
    responses: {
      200: {
        description: "運航規模データを取得しました",
        content: {
          "application/json": {
            schema: getFlightScaleResourceInputResSchema,
          },
        },
      },
      400: {
        description: "プランIDを入力してください",
      },
      404: {
        description: "運航規模データが見つかりません",
      },
    },
  });
};
