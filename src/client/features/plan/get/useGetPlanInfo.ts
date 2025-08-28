import { GetPlanOneResSchema } from "@/server/features/plan/get/one/schema";
import { useQuery } from "@tanstack/react-query";

export const useGetPlanInfo = (planId: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["plan", planId],
    queryFn: async (): Promise<GetPlanOneResSchema> => {
      const res = await fetch(`/api/plan/get/one?planId=${planId}`);
      if (!res.ok) {
        throw new Error("プラン情報の取得に失敗しました");
      }
      return res.json();
    },
  });

  return { data, isPending, error };
};
