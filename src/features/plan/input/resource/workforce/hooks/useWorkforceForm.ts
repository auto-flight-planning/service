import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/features/toast";
import { usePlanId } from "@/features/plan/stores/planStore";
import useGetWorkforce from "./useGetWorkforce";
import { WorkforceFormData, workforceFormSchema } from "../schemas/formSchema";
import { WorkforceSchema } from "../../../servers/schemas/common.schema";
import snakeCaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

export default function useWorkforceForm() {
  const planId = usePlanId();
  const { workforceData, isFetching } = useGetWorkforce();

  const formMethods = useForm<WorkforceFormData>({
    mode: "onChange",
    resolver: zodResolver(workforceFormSchema),
    defaultValues: {
      captainCnt: undefined,
      subCaptainCnt: undefined,
      otherPersonnelNorm: undefined,
    },
  });

  // init
  useEffect(() => {
    if (workforceData && !isFetching) {
      const { captainCnt, subCaptainCnt, otherPersonnelNorm } = workforceData;
      formMethods.reset({
        captainCnt: captainCnt ? Number(captainCnt) : undefined,
        subCaptainCnt: subCaptainCnt ? Number(subCaptainCnt) : undefined,
        otherPersonnelNorm: otherPersonnelNorm
          ? Number(otherPersonnelNorm)
          : undefined,
      });
    }
  }, [isFetching]);

  const { addToast } = useToastStore();
  const queryClient = useQueryClient();

  const { mutate: updateWorkforce, isPending } = useMutation({
    mutationFn: (data: WorkforceFormData) => updateWorkforceAPI(planId, data),
    onSuccess: (data) => {
      addToast({
        type: "success",
        title: "総人員データ更新成功",
        message: "総人員データを更新しました。",
      });
      queryClient.invalidateQueries({
        queryKey: ["planInput", planId, "workforce"],
      });
      queryClient.invalidateQueries({
        queryKey: ["plan", planId, "status", "input"],
      });
    },
    onError: (error) => {
      addToast({
        type: "error",
        title: "総人員データ更新失敗",
        message: "総人員データを更新に失敗しました。",
      });
    },
  });

  const onValidSubmit = (data: WorkforceFormData) => updateWorkforce(data);

  return {
    formMethods,
    onValidSubmit,
    isPending,
  };
}

export const updateWorkforceAPI = async (
  planId: string,
  data: WorkforceFormData
) => {
  try {
    const res = await apiFetchJson<WorkforceSchema>(
      `/api/plans/${planId}/inputs/resources/workforce`,
      {
        method: "PUT",
        body: snakeCaseKeys(data),
      }
    );
    const updatedWorkforce = camelcaseKeys(res, { deep: true });
    return updatedWorkforce;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
