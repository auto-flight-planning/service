import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const baseResponseSchema = z.object({
  success: z.boolean().openapi({
    description: "成功かどうか",
    example: true,
  }),
  message: z.string().openapi({
    description: "メッセージ",
    example: "Success",
  }),
});
