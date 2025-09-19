"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/features/toast";
import { useModalStore } from "@/features/modal";
import {
  editParticipantsFormSchema,
  type EditParticipantsFormSchema,
} from "../schemas/form.schema";
import { UpdatePlanParticipantsResSchema } from "../../servers/schemas/res.schema";
import { errorResToMessage } from "@/lib/utils";
import { UpdateParticipantsReqSchema } from "../../servers/schemas/req.schema";

export default function useEditParticipant({
  planId,
  defaultValue,
}: {
  planId: string;
  defaultValue: EditParticipantsFormSchema;
}) {
  const formMethods = useForm<EditParticipantsFormSchema>({
    mode: "onChange",
    resolver: zodResolver(editParticipantsFormSchema),
    defaultValues: defaultValue,
  });

  const { addToast } = useToastStore();
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: editParticipant, isPending } = useMutation({
    mutationFn: (data: EditParticipantsFormSchema) =>
      editParticipantAPI(planId, defaultValue, data),
    onSuccess: (data) => {
      addToast({
        type: "success",
        message: "計画参加者を変更しました。",
        title: "計画参加者変更成功",
      });
      queryClient.invalidateQueries({
        queryKey: ["plan", planId, "participants"],
      });
      openModal("participantView", { planId });
    },
    onError: (error) => {
      addToast({
        type: "error",
        message: "計画参加者を変更に失敗しました。",
        title: "計画参加者変更失敗",
      });
    },
  });

  const { handleSubmit } = formMethods;
  const onValidSubmit = (data: EditParticipantsFormSchema) =>
    editParticipant(data);
  const onSubmit = handleSubmit(onValidSubmit);

  return { formMethods, onSubmit, isPending };
}

export const editParticipantAPI = async (
  planId: string,
  prevParticipants: EditParticipantsFormSchema,
  formData: EditParticipantsFormSchema
) => {
  try {
    const res = await fetch(`/api/plans/${planId}/participants`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatFormDataToReq(prevParticipants, formData)),
    });
    if (!res.ok) {
      throw new Error(
        errorResToMessage(res, "PUT /api/plans/${planId}/participants")
      );
    }

    const updatedPlan: UpdatePlanParticipantsResSchema = await res.json();
    return updatedPlan;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const formatFormDataToReq = (
  prevParticipants: EditParticipantsFormSchema,
  formData: EditParticipantsFormSchema
): UpdateParticipantsReqSchema => {
  const addParticipants = formData.participants.filter(
    (participant) =>
      !prevParticipants.participants.some(
        (p) => p.userId === participant.userId
      )
  );

  const updateParticipants = formData.participants.filter((participant) => {
    const prevParticipant = prevParticipants.participants.find(
      (p) => p.userId === participant.userId
    );
    if (!prevParticipant) return false;
    return (
      participant.permission.length !== prevParticipant.permission.length ||
      !participant.permission.every((perm) =>
        prevParticipant.permission.includes(perm)
      )
    );
  });

  const removeParticipantIds = prevParticipants.participants
    .filter(
      (participant) =>
        !formData.participants.some((p) => p.userId === participant.userId)
    )
    .map((participant) => participant.userId);

  return { addParticipants, updateParticipants, removeParticipantIds };
};
