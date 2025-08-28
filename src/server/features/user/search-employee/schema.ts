import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const searchEmployeeReqSchema = z.object({
  searchName: z
    .string()
    .min(1)
    .openapi({
      param: {
        name: "searchName",
        in: "query",
      },
      example: "김철수",
    }),
});

export const searchEmployeeResSchema = z.object({
  employees: z.array(
    z.object({
      employeeId: z.string(),
      userId: z.uuid(),
      lastName: z.string().min(1),
      firstName: z.string().min(1),
    })
  ),
});

export type SearchEmployeeReqSchema = z.infer<typeof searchEmployeeReqSchema>;
export type SearchEmployeeResSchema = z.infer<typeof searchEmployeeResSchema>;
