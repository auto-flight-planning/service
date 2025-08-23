import { useModalStore } from "@/client/stores";
import { BasicModalHeader } from "@/client/components/modal";
import { LoginForm } from ".";
import { UnderlineButton } from "@/client/components/button";

export default function LoginModal() {
  const { closeModal } = useModalStore();

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="ログイン" onClose={closeModal} />
      <LoginForm />
      <hr className="border-gray-200" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-500">
          アカウントをお持ちでない方はこちら
        </p>
        <UnderlineButton text="会員登録" />
      </div>
    </div>
  );
}
