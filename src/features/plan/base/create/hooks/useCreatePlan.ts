"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/features/toast";
import { useModalStore } from "@/features/modal";
import {
  createPlanFormSchema,
  type CreatePlanFormData,
} from "../schemas/formSchema";
import { CreatePlanResSchema } from "../../server/schemas/res.schema";
import { errorResToMessage } from "@/lib/utils";
import { formatParticipantsField } from "@/features/plan/participant";

export default function useCreatePlan() {
  const formMethods = useForm<CreatePlanFormData>({
    mode: "onChange",
    resolver: zodResolver(createPlanFormSchema),
    defaultValues: {
      title: "",
      year: "",
      month: "",
      participants: [],
    },
  });

  const router = useRouter();
  const { addToast } = useToastStore();
  const { closeModal } = useModalStore();

  const { mutate: createPlan, isPending } = useMutation({
    mutationFn: createPlanAPI,
    onSuccess: (data) => {
      const { id } = data;
      addToast({
        type: "success",
        message: "企画を作成しました。",
        title: "企画作成成功",
      });
      router.push(`/plan/${id}/input`);
      closeModal();
    },
    onError: (error) => {
      addToast({
        type: "error",
        message: "企画作成に失敗しました。",
        title: "企画作成失敗",
      });
    },
  });

  const { handleSubmit } = formMethods;
  const onValidSubmit = (data: CreatePlanFormData) => createPlan(data);
  const onSubmit = handleSubmit(onValidSubmit);

  return {
    formMethods,
    onSubmit,
    isPending,
  };
}

export const createPlanAPI = async (data: CreatePlanFormData) => {
  try {
    const res = await fetch("/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        targetDate: `${data.year}-${data.month}-01`,
        participantDataList: formatParticipantsField(data.participants),
      }),
    });
    if (!res.ok) {
      throw new Error(errorResToMessage(res, "POST /api/plans"));
    }

    const plan: CreatePlanResSchema = await res.json();
    return plan;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
