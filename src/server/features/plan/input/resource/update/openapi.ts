import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  updateTotalPersonResourceInputReqSchema,
  updateInputResSchema,
} from "./schema";

export const registerUpdateTotalPersonResourceSchemas = (
  registry: OpenAPIRegistry
) => {
  registry.registerPath({
    method: "post",
    path: "/api/plan/input/resource/update/total-person",
    tags: ["Plan/Input"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: updateTotalPersonResourceInputReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "リソース入力を更新しました",
        content: {
          "application/json": {
            schema: updateInputResSchema,
          },
        },
      },
    },
  });
};
