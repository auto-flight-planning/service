import { FormProvider } from "react-hook-form";
import {
  useModalStore,
  BasicModalHeader,
  BasicModalFooter,
} from "@/features/modal";
import useEditParticipant from "../hooks/useEditParticipant";
import ParticipantsField from "./field";
import { type EditParticipantsFormSchema } from "../schemas/form.schema";

export default function ParticipantsEditModal({
  planId,
  defaultValue,
}: {
  planId: string;
  defaultValue: EditParticipantsFormSchema;
}) {
  const { formMethods, onSubmit, isPending } = useEditParticipant({
    planId,
    defaultValue,
  });
  const { closeModal, openModal } = useModalStore();

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="計画参加者管理" onClose={closeModal} />
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <ParticipantsField />
        </form>
        <BasicModalFooter
          cancelProps={{
            text: "キャンセル",
            color: "light-gray",
            onClick: () => openModal("participantView", { planId }),
            disabled: isPending,
          }}
          confirmProps={{
            text: "提出",
            onClick: onSubmit,
            disabled: isPending,
            isLoading: isPending,
          }}
        />
      </FormProvider>
    </div>
  );
}
