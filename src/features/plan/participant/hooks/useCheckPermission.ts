"use client";

import useGetParticipants from "../view/hooks/useGetParticipants";
import useUserStore from "@/features/auth/stores/userStore";
import { checkPlanParticipantsPermission } from "@/lib/utils";
import { type ParticipantPermission } from "../type";

export default function useCheckPermission(
  type: "CREATOR" | ParticipantPermission
) {
  const { user } = useUserStore();
  const { participants } = useGetParticipants();

  if (participants!.creator.userId === user!.userId) return true;

  const hasAccess = checkPlanParticipantsPermission({
    planParticipants: participants!,
    userId: user!.userId,
    type,
  });

  return hasAccess;
}
