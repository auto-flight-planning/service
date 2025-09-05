import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { PLAN_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

// plan_id
export const planIdPathReqSchema = z.object({
  planId: z.uuid().openapi({
    param: {
      name: "planId",
      in: "path",
    },
    example: PLAN_ID_EXAMPLE,
  }),
});
