import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { userIdSchema } from "@/server/schemas/common.schema";
import { EMPLOYEE_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const getEmployeeResSchema = z.object({
  id: z.uuid().openapi({
    description: "職員ID",
    example: EMPLOYEE_ID_EXAMPLE,
  }),
  userId: userIdSchema,
  lastName: z.string().min(1).openapi({
    description: "姓",
    example: "田中",
  }),
  firstName: z.string().min(1).openapi({
    description: "名",
    example: "太郎",
  }),
  email: z.email().openapi({
    description: "メールアドレス",
    example: "test@example.com",
  }),
});

export const searchEmployeesByNameResSchema = z.object({
  employees: z.array(getEmployeeResSchema),
});

export type GetEmployeeResSchema = z.infer<typeof getEmployeeResSchema>;
export type SearchEmployeesByNameResSchema = z.infer<
  typeof searchEmployeesByNameResSchema
>;
