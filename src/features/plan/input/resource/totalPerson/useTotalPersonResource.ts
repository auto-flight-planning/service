import { useForm } from "react-hook-form";
import {
  totalPersonResourceSchema,
  type TotalPersonResourceFormDataType,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/features/toast";
import { queryClient } from "@/app/(web)/_providers/reactQueryProvider";
import { useEffect } from "react";

export default function useTotalPersonResource(planId: string) {
  const { data: totalPersonResource, isPending: isPendingToGet } = useQuery({
    queryKey: ["planInput", "totalPersonResource", planId],
    queryFn: () => getTotalPersonResourceAPI(planId),
  });

  const formMethods = useForm<TotalPersonResourceFormDataType>({
    mode: "onChange",
    resolver: zodResolver(totalPersonResourceSchema),
    defaultValues: {
      pilot_cnt: undefined,
      second_pilot_cnt: undefined,
      total_person_exponent: undefined,
    },
  });

  // 데이터를 불러온 후 form에 설정
  useEffect(() => {
    if (totalPersonResource && !isPendingToGet) {
      formMethods.reset({
        pilot_cnt: totalPersonResource.pilot_cnt,
        second_pilot_cnt: totalPersonResource.second_pilot_cnt,
        total_person_exponent: totalPersonResource.total_person_exponent,
      });
    }
  }, [totalPersonResource, isPendingToGet, formMethods]);

  const { addToast } = useToastStore();

  const { mutate: updateTotalPersonResource, isPending: isPendingToUpdate } =
    useMutation({
      mutationFn: (data: TotalPersonResourceFormDataType) =>
        updateTotalPersonResourceAPI(data, planId),
      onSuccess: () => {
        addToast({
          type: "success",
          message: "総人員データの入力に成功しました。",
          title: "総人員データ入力成功",
        });
        queryClient.invalidateQueries({ queryKey: ["planInfo", planId] });
        queryClient.invalidateQueries({
          queryKey: ["planInput", "totalPersonResource", planId],
        });
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: error.message || "総人員データの入力に失敗しました。",
          title: "総人員データ入力失敗",
        });
      },
    });

  const onValidSubmit = (data: TotalPersonResourceFormDataType) => {
    updateTotalPersonResource(data);
  };

  return {
    formMethods,
    onValidSubmit,
    isPendingToGet,
    isPendingToUpdate,
  };
}

export const getTotalPersonResourceAPI = async (planId: string) => {
  const res = await fetch(
    `/api/plan/input/resource/get/total-person?planId=${planId}`
  );
  if (!res.ok) {
    throw new Error("総人員データの取得に失敗しました。");
  }
  return res.json();
};

export const updateTotalPersonResourceAPI = async (
  data: TotalPersonResourceFormDataType,
  planId: string
) => {
  const res = await fetch("/api/plan/input/resource/update/total-person", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      planId,
      pilot_cnt: data.pilot_cnt,
      second_pilot_cnt: data.second_pilot_cnt,
      total_person_exponent: data.total_person_exponent,
    }),
  });
  if (!res.ok) {
    throw new Error("総人員データの入力に失敗しました。");
  }
  return res.json();
};
