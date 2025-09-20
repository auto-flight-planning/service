import { FormProvider } from "react-hook-form";
import {
  useModalStore,
  BasicModalHeader,
  BasicModalFooter,
} from "@/features/modal";
import useEditTitle from "../hooks/useEditTitle";
import EditTitleForm from "./form";
import { type EditTitleFormData } from "../schemas/editTitleFormSchema";

export default function EditTitleModal({
  planId,
  defaultValue: { title } = { title: "" },
}: {
  planId: string;
  defaultValue: EditTitleFormData;
}) {
  const { formMethods, onSubmit, isPending } = useEditTitle({
    planId,
    defaultValue: { title },
  });
  const { closeModal } = useModalStore();

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="計画名編集" onClose={closeModal} />
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <EditTitleForm />
          <BasicModalFooter
            confirmProps={{
              text: "変更",
              onClick: onSubmit,
              disabled: isPending,
              isLoading: isPending,
            }}
          />
        </form>
      </FormProvider>
    </div>
  );
}
