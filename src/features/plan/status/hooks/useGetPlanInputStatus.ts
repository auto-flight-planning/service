import { useQuery } from "@tanstack/react-query";
import { GetPlanInputsStatusResSchema } from "../server/schemas/res.schema";
import { errorResToMessage } from "@/lib/utils";

export default function useGetPlanInputStatus(planId: string) {
  const { data: planInputStatus = null, isFetching } = useQuery({
    queryKey: ["plan", planId, "status", "input"],
    queryFn: () => getPlanInputStatusAPI(planId),
    enabled: !!planId,
    staleTime: 60 * 60 * 1000, // 1時間
  });
  return { planInputStatus, isFetching };
}

export const getPlanInputStatusAPI = async (planId: string) => {
  try {
    const planInputStatusRes = await fetch(`/api/plans/${planId}/status/input`);
    if (!planInputStatusRes.ok) {
      throw new Error(
        errorResToMessage(
          planInputStatusRes,
          "GET /api/plans/${planId}/status/input"
        )
      );
    }
    const planInputStatus: GetPlanInputsStatusResSchema =
      await planInputStatusRes.json();
    return planInputStatus;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
