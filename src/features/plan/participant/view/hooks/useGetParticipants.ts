"use client";

import { useQuery } from "@tanstack/react-query";
import { type GetPlanParticipantsResSchema } from "../../servers/schemas/res.schema";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

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
    const res = await apiFetchJson<GetPlanParticipantsResSchema>(
      `/api/plans/${planId}/participants`
    );
    const participants = camelcaseKeys(res, { deep: true });
    return participants;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
