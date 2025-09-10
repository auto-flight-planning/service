import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/features/toast";
import { useModalStore } from "@/features/modal";
import {
  EditTitleFormData,
  editTitleFormSchema,
} from "../schemas/editTitleFormSchema";
import { PlanSchema } from "../../../server/schemas/common.schema";
import { errorResToMessage } from "@/lib/utils";

export default function useEditTitle({
  planId,
  defaultValue: { title } = { title: "" },
}: {
  planId: string;
  defaultValue: EditTitleFormData;
}) {
  const formMethods = useForm<EditTitleFormData>({
    mode: "onChange",
    resolver: zodResolver(editTitleFormSchema),
    defaultValues: {
      title,
    },
  });

  const { addToast } = useToastStore();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: editTitle, isPending } = useMutation({
    mutationFn: (data: EditTitleFormData) => editTitleAPI(planId, data),
    onSuccess: (data) => {
      addToast({
        type: "success",
        message: "企画名を変更しました。",
        title: "企画名変更成功",
      });
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["plan", planId] });
    },
    onError: (error) => {
      addToast({
        type: "error",
        message: "企画名を変更に失敗しました。",
        title: "企画名変更失敗",
      });
    },
  });

  const { handleSubmit } = formMethods;
  const onValidSubmit = (data: EditTitleFormData) => editTitle(data);
  const onSubmit = handleSubmit(onValidSubmit);

  return {
    formMethods,
    onSubmit,
    isPending,
  };
}

export const editTitleAPI = async (planId: string, data: EditTitleFormData) => {
  try {
    const res = await fetch(`/api/plans/${planId}/title`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(errorResToMessage(res, "PUT /api/plans/${planId}/title"));
    }

    const updatedPlan: PlanSchema = await res.json();
    return updatedPlan;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
