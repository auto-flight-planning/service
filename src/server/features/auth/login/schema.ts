import { z } from "zod";

export const loginReqSchema = z.object({
  employeeId: z.string().min(1),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/),
});

export const loginResSchema = z.object({
  accessToken: z.string().min(1),
  employeeId: z.string().min(1),
  lastName: z.string().min(1),
  firstName: z.string().min(1),
});

export type LoginReqSchema = z.infer<typeof loginReqSchema>;
export type LoginResSchema = z.infer<typeof loginResSchema>;
