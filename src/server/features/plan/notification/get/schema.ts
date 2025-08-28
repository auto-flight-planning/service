import { z } from "zod";

export const getNotificationReqSchema = z.object({
  userId: z.uuid(),
});

export const getNotificationResSchema = z.object({
  notifications: z.array(
    z.object({
      id: z.uuid(),
      planId: z.uuid(),
      planName: z.string(),
      sender: z.string(),
      message: z.string(),
      createdAt: z.date(),
      is_confirmed: z.boolean(),
    })
  ),
});

export type GetNotificationReqSchema = z.infer<typeof getNotificationReqSchema>;
export type GetNotificationResSchema = z.infer<typeof getNotificationResSchema>;
