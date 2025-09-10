"use client";

import { useQuery } from "@tanstack/react-query";
import { GetPlanParticipantsResSchema } from "../../servers/schemas/res.schema";
import { errorResToMessage } from "@/lib/utils";

export default function useGetParticipants(planId: string) {
  const { data: participants = null, isFetching } = useQuery({
    queryKey: ["plan", planId, "participants"],
    queryFn: () => getParticipantsAPI(planId),
    enabled: !!planId,
    staleTime: 60 * 60 * 1000, // 1時間
  });

  return { participants, isFetching };
}

export const getParticipantsAPI = async (planId: string) => {
  try {
    const participantsRes = await fetch(`/api/plans/${planId}/participants`);
    if (!participantsRes.ok) {
      throw new Error(
        errorResToMessage(
          participantsRes,
          "GET /api/plans/${planId}/participants"
        )
      );
    }
    const participants: GetPlanParticipantsResSchema =
      await participantsRes.json();
    return participants;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
