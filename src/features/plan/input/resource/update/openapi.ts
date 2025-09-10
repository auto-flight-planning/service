import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  updateTotalPersonResourceInputReqSchema,
  updateInputResSchema,
  updateFlightScaleResourceInputReqSchema,
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
        description: "リソース入力を変更しました",
        content: {
          "application/json": {
            schema: updateInputResSchema,
          },
        },
      },
    },
  });
};

export const registerUpdateFlightScaleResourceSchemas = (
  registry: OpenAPIRegistry
) => {
  registry.registerPath({
    method: "post",
    path: "/api/plan/input/resource/update/flight-scale",
    tags: ["Plan/Input"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: updateFlightScaleResourceInputReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "リソース入力を変更しました",
        content: {
          "application/json": {
            schema: updateInputResSchema,
          },
        },
      },
      404: {
        description: "Plan status not found",
      },
    },
  });
};
