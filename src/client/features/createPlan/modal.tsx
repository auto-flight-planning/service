import { FormProvider } from "react-hook-form";
import { useModalStore } from "@/client/stores";
import { BasicModalHeader, BasicModalFooter } from "@/client/components/modal";
import { CreatePlanForm, useCreatePlan } from ".";

export default function CreatePlanModal() {
  const { closeModal } = useModalStore();
  const { formMethods, onValidSubmit, isPending } = useCreatePlan();
  const { handleSubmit } = formMethods;

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <FormProvider {...formMethods}>
        <BasicModalHeader title="新規企画作成" onClose={closeModal} />
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <CreatePlanForm />
          <BasicModalFooter
            cancelText="キャンセル"
            confirmText="作成"
            onCancel={closeModal}
            onConfirm={handleSubmit(onValidSubmit)}
            isPending={isPending}
          />
        </form>
      </FormProvider>
    </div>
  );
}
