import { useModalStore } from "@/client/stores";
import { BasicModalHeader } from "@/client/components/modal";
import { CreatePlanForm } from ".";

export default function CreatePlanModal() {
  const { closeModal } = useModalStore();

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="新規企画作成" onClose={closeModal} />
      <CreatePlanForm />
    </div>
  );
}
