import { ParticipantsFieldSchema } from "./schemas/form.schema";

export const formatParticipantsField = (
  participants: ParticipantsFieldSchema
) => {
  return participants.map((p) => ({
    userId: p.userId,
    permission: p.permission,
  }));
};
