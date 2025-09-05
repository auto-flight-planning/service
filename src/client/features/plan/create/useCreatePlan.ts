import { useRouter } from "next/navigation";
import { useToastStore, useUserStore } from "@/client/stores";
import { useModalStore } from "@/features/modal/modalStore";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlanSchema, type CreatePlanFormDataType } from "./schema";
import { getMonthOptions, getStartMonth } from "./utils";
import { useMutation } from "@tanstack/react-query";

export default function useCreatePlan() {
  const formMethods = useForm<CreatePlanFormDataType>({
    mode: "onChange",
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      planName: "",
      year: "",
      month: "",
      participants: [],
    },
  });
  const { control, setValue } = formMethods;

  const watchYear = useWatch({ control, name: "year" });
  const watchMonth = useWatch({ control, name: "month" });
  const onYearChange = (year: string) => {
    setValue("year", year);
    if (!watchMonth) return;
    if (Number(watchMonth) < getStartMonth(year)) {
      setValue("month", "");
    }
  };

  const router = useRouter();
  const { addToast } = useToastStore();
  const { user } = useUserStore();
  const { closeModal } = useModalStore();

  const { mutate: createPlan, isPending } = useMutation({
    mutationFn: (data: CreatePlanFormDataType) =>
      createPlanAPI(data, user!.userId),
    onSuccess: (data) => {
      const { planId } = data;
      addToast({
        type: "success",
        message: "企画を作成しました。",
        title: "企画作成成功",
      });
      router.push(`/plan/${planId}/input`);
      closeModal();
    },
    onError: (error) => {
      addToast({
        type: "error",
        message: error.message || "企画作成に失敗しました。",
        title: "企画作成失敗",
      });
    },
  });

  const onValidSubmit = (data: CreatePlanFormDataType) => {
    createPlan(data);
  };

  return {
    formMethods,
    onValidSubmit,
    isPending,
    dateProps: {
      monthOptions: getMonthOptions(watchYear),
      onYearChange,
    },
  };
}

export const createPlanAPI = async (
  data: CreatePlanFormDataType,
  userId: string
) => {
  const res = await fetch("/api/plan/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      name: data.planName,
      year: Number(data.year),
      month: Number(data.month),
      participant_ids: data.participants.map((p) => p.userId),
    }),
  });
  if (!res.ok) {
    throw new Error("企画作成に失敗しました。");
  }
  return res.json();
};
