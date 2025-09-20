import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { getPlanInputsStatusResSchema } from "./schemas/res.schema";
import { commonOpenApiResponses } from "@/server/lib/helpers";

export const registerPlanStatusAPIsToDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/plans/{planId}/status/input",
    tags: ["Plan Status"],
    summary: "計画入力データのステータスをplanIdで取得",
    security: [{ BearerAuth: [] }],
    request: {
      params: planIdReqSchema("path"),
    },
    responses: {
      200: {
        description: "計画入力データのステータスを取得しました",
        content: {
          "application/json": {
            schema: getPlanInputsStatusResSchema,
          },
        },
      },
      ...commonOpenApiResponses({
        auth: true,
        planNotFound: true,
        permission: true,
        permissionType: "VIEW",
      }),
    },
  });
};
