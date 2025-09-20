import { useQuery } from "@tanstack/react-query";
import { PlanSchema } from "../../server/schemas/common.schema";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

export default function useGetPlan(planId: string) {
  const { data: plan = null, isFetching } = useQuery({
    queryKey: ["plan", planId],
    queryFn: () => getPlanAPI(planId),
    enabled: !!planId,
    staleTime: 60 * 60 * 1000, // 1時間
  });

  return { plan, isFetching };
}

export const getPlanAPI = async (planId: string) => {
  try {
    const res = await apiFetchJson<PlanSchema>(`/api/plans/${planId}`);
    const plan = camelcaseKeys(res, { deep: true });
    return plan;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
