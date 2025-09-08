import { ParticipantsFieldSchema } from "./schemas/filed.schema";

export const formatParticipantsField = (
  participants: ParticipantsFieldSchema
) => {
  return participants.map((p) => ({
    userId: p.userId,
    permission: p.permission,
  }));
};
