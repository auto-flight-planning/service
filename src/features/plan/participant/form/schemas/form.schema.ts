import z from "zod";
import { PARTICIPANT_PERMISSION_VALUES } from "../../type";

export const participantsFieldSchema = z.array(
  z.object({
    userId: z.uuid(),
    lastName: z.string(),
    firstName: z.string(),
    email: z.email(),
    permission: z.array(z.enum(PARTICIPANT_PERMISSION_VALUES)),
  })
);
export type ParticipantsFieldSchema = z.infer<typeof participantsFieldSchema>;
export type Participant = ParticipantsFieldSchema[number];

export const editParticipantsFormSchema = z.object({
  participants: participantsFieldSchema,
});
export type EditParticipantsFormSchema = z.infer<
  typeof editParticipantsFormSchema
>;
