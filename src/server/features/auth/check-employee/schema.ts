import { z } from "zod";

export const checkEmployeeReqSchema = z.object({
  employeeId: z.string().min(1),
});

export const checkEmployeeResSchema = z.object({
  employeeId: z.string().min(1),
  email: z.email(),
  lastName: z.string().min(1),
  firstName: z.string().min(1),
});

export type CheckEmployeeReqSchema = z.infer<typeof checkEmployeeReqSchema>;
export type CheckEmployeeResSchema = z.infer<typeof checkEmployeeResSchema>;
