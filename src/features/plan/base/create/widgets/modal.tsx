import { FormProvider } from "react-hook-form";
import {
  useModalStore,
  BasicModalHeader,
  BasicModalFooter,
} from "@/features/modal";
import { CreatePlanForm, useCreatePlan } from "..";

export default function CreatePlanModal() {
  const { formMethods, onValidSubmit, isPending } = useCreatePlan();
  const { closeModal } = useModalStore();
  const { handleSubmit } = formMethods;

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="新規企画作成" onClose={closeModal} />
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <CreatePlanForm />
          <BasicModalFooter
            confirmProps={{
              text: "作成",
              onClick: handleSubmit(onValidSubmit),
              disabled: isPending,
              isPending: isPending,
            }}
          />
        </form>
      </FormProvider>
    </div>
  );
}
