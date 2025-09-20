import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { userIdSchema } from "@/server/schemas/common.schema";
import { EMPLOYEE_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const getEmployeeByIdResSchema = z.object({
  id: z.string().openapi({
    description: "職員ID",
    example: EMPLOYEE_ID_EXAMPLE,
  }),
  last_name: z.string().min(1).openapi({
    description: "姓",
    example: "田中",
  }),
  first_name: z.string().min(1).openapi({
    description: "名",
    example: "太郎",
  }),
  email: z.email().openapi({
    description: "メールアドレス",
    example: "test@example.com",
  }),
});
export type GetEmployeeByIdResSchema = z.infer<typeof getEmployeeByIdResSchema>;

export const getEmployeeByUserIdResSchema = getEmployeeByIdResSchema.extend({
  user_id: userIdSchema,
});
export type GetEmployeeByUserIdResSchema = z.infer<
  typeof getEmployeeByUserIdResSchema
>;

export const searchEmployeesByNameResSchema = z.object({
  employees: z.array(getEmployeeByUserIdResSchema),
});
export type SearchEmployeesByNameResSchema = z.infer<
  typeof searchEmployeesByNameResSchema
>;

export type Employees = SearchEmployeesByNameResSchema["employees"];
export type Employee = Employees[number];
