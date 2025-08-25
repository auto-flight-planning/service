import { z } from "zod";

export const getEmployeeReqSchema = z.object({
  userId: z.uuid(),
});

export const getEmployeeResSchema = z.object({
  employeeId: z.string().min(1),
  lastName: z.string().min(1),
  firstName: z.string().min(1),
});

export type GetEmployeeReqSchema = z.infer<typeof getEmployeeReqSchema>;
export type GetEmployeeResSchema = z.infer<typeof getEmployeeResSchema>;
