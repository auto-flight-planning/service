import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { PLAN_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const planIdSchema = z.uuid().openapi({
  description: "企画ID",
  example: PLAN_ID_EXAMPLE,
});
