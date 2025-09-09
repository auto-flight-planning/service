import { errorResToMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { type plans as Plans } from "@/server/db/prisma";

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
    const planRes = await fetch(`/api/plans/${planId}`);
    if (!planRes.ok) {
      throw new Error(errorResToMessage(planRes, "GET /api/plans/${planId}"));
    }
    const plan: Plans = await planRes.json();
    return plan;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
