import { FormProvider } from "react-hook-form";
import {
  useModalStore,
  BasicModalHeader,
  BasicModalFooter,
} from "@/features/modal";
import useCreatePlan from "../hooks/useCreatePlan";
import CreatePlanForm from "./form";

export default function CreatePlanModal() {
  const { formMethods, onSubmit, isPending } = useCreatePlan();
  const { closeModal } = useModalStore();

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="新規企画作成" onClose={closeModal} />
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <CreatePlanForm />
          <BasicModalFooter
            confirmProps={{
              text: "作成",
              onClick: onSubmit,
              disabled: isPending,
              isPending: isPending,
            }}
          />
        </form>
      </FormProvider>
    </div>
  );
}
