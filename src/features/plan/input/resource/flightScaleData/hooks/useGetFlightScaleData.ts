import { useQuery } from "@tanstack/react-query";
import { usePlanId } from "@/features/plan/stores/planStore";
import { GetFlightScaleDataResSchema } from "@/features/plan/input/servers/schemas/res.schema";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

export default function useGetFlightScaleData() {
  const planId = usePlanId();
  const { data: flightScaleData, isFetching } = useQuery({
    queryKey: ["planInput", planId, "flightScaleData"],
    queryFn: () => getFlightScaleDataAPI(planId),
    enabled: !!planId,
    staleTime: 30 * 60 * 1000, // 30分
  });

  return { flightScaleData, isFetching };
}

export const getFlightScaleDataAPI = async (planId: string) => {
  try {
    const res = await apiFetchJson<GetFlightScaleDataResSchema>(
      `/api/plans/${planId}/inputs/resources/flight-scale-data`
    );
    const flightScaleData = camelcaseKeys(res, { deep: true });
    return flightScaleData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
