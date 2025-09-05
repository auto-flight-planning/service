import { z } from "zod";

export const createPlanReqSchema = z.object({
  userId: z.uuid(),
  name: z.string().min(1),
  year: z.number(),
  month: z.number(),
  participant_ids: z.array(z.string()),
});

export const createPlanResSchema = z.object({
  planId: z.uuid(),
  creatorId: z.uuid(),
  name: z.string().min(1),
  year: z.number(),
  month: z.number(),
  participant_ids: z.array(z.string()),
});

export type CreatePlanReqSchema = z.infer<typeof createPlanReqSchema>;
export type CreatePlanResSchema = z.infer<typeof createPlanResSchema>;
