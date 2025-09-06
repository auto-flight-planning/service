import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { EMPLOYEE_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const getEmployeeByIdReqSchema = z.object({
  employeeId: z.string().openapi({
    param: {
      name: "employeeId",
      in: "path",
    },
    description: "職員ID",
    example: EMPLOYEE_ID_EXAMPLE,
  }),
});

export const searchEmployeesByNameReqSchema = z.object({
  searchName: z
    .string()
    .min(1)
    .openapi({
      param: {
        name: "searchName",
        in: "query",
      },
      description: "氏名検索語",
      example: "田中",
    }),
});

export type GetEmployeeByIdReqSchema = z.infer<typeof getEmployeeByIdReqSchema>;
export type SearchEmployeesByNameReqSchema = z.infer<
  typeof searchEmployeesByNameReqSchema
>;
