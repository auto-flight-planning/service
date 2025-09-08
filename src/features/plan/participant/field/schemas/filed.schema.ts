import z from "zod";
import { ParticipantPermissionEnum } from "../../type";

export const participantsFieldSchema = z.array(
  z.object({
    userId: z.uuid(),
    lastName: z.string(),
    firstName: z.string(),
    permission: z.array(z.enum(ParticipantPermissionEnum)),
  })
);
export type ParticipantsFieldSchema = z.infer<typeof participantsFieldSchema>;
export type Participant = ParticipantsFieldSchema[number];
