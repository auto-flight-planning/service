import { useModalStore, BasicModalHeader } from "@/features/modal";
import LoginForm from "./form";

export default function LoginModal() {
  const { closeModal } = useModalStore();

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="ログイン" onClose={closeModal} />
      <LoginForm />
    </div>
  );
}
