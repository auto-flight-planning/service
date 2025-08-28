import { useModalStore } from "@/client/stores";
import { BasicModalHeader } from "@/client/components/modal";
import { LoginForm } from ".";

export default function LoginModal() {
  const { closeModal } = useModalStore();

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="ログイン" onClose={closeModal} />
      <LoginForm />
    </div>
  );
}
