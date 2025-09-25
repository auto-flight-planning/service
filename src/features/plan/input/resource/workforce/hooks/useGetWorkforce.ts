import { useQuery } from "@tanstack/react-query";
import { usePlanId } from "@/features/plan/stores/planStore";
import { WorkforceSchema } from "@/features/plan/input/servers/schemas/common.schema";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

export default function useGetWorkforce() {
  const planId = usePlanId();
  const { data: workforceData, isFetching } = useQuery({
    queryKey: ["planInput", planId, "workforce"],
    queryFn: () => getWorkforceAPI(planId),
    enabled: !!planId,
    staleTime: 30 * 60 * 1000, // 30分
  });

  return { workforceData, isFetching };
}

export const getWorkforceAPI = async (planId: string) => {
  try {
    const res = await apiFetchJson<WorkforceSchema>(
      `/api/plans/${planId}/inputs/resources/workforce`
    );
    const workforceData = camelcaseKeys(res, { deep: true });
    return workforceData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
