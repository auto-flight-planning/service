import { useQuery } from "@tanstack/react-query";
import usePlanStore from "@/features/plan/stores/planStore";
import { type GetPlanInputsStatusResSchema } from "../server/schemas/res.schema";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

export default function useGetPlanInputStatus() {
  const { planId } = usePlanStore();

  const { data: planInputStatus = null, isFetching } = useQuery({
    queryKey: ["plan", planId, "status", "input"],
    queryFn: () => getPlanInputStatusAPI(planId!),
    enabled: !!planId,
    staleTime: 60 * 60 * 1000, // 1時間
  });
  return { planInputStatus, isFetching };
}

export const getPlanInputStatusAPI = async (planId: string) => {
  try {
    const res = await apiFetchJson<GetPlanInputsStatusResSchema>(
      `/api/plans/${planId}/status/input`
    );
    const planInputStatus = camelcaseKeys(res, { deep: true });
    return planInputStatus;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
