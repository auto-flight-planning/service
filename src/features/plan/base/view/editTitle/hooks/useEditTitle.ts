import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/features/toast";
import { useModalStore } from "@/features/modal";
import { usePlanId } from "@/features/plan/stores/planStore";
import {
  type EditTitleFormData,
  editTitleFormSchema,
} from "../schemas/editTitleFormSchema";
import { type PlanSchema } from "../../../server/schemas/common.schema";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

export default function useEditTitle({
  defaultValue: { title } = { title: "" },
}: {
  defaultValue: EditTitleFormData;
}) {
  const planId = usePlanId();
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
        message: "計画名を変更しました。",
        title: "計画名変更成功",
      });
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["plan", planId] });
    },
    onError: (error) => {
      addToast({
        type: "error",
        message: "計画名を変更に失敗しました。",
        title: "計画名変更失敗",
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
    const res = await apiFetchJson<PlanSchema>(`/api/plans/${planId}/title`, {
      method: "PUT",
      body: data,
    });
    const updatedPlan = camelcaseKeys(res, { deep: true });
    return updatedPlan;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
