import { useModalStore } from "@/client/stores";
import { BasicModalHeader } from "@/client/components/modal";
import { SignUpForm } from ".";
import { UnderlineButton } from "@/client/components/button";

export default function LoginModal() {
  const { closeModal, openModal } = useModalStore();

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="会員登録" onClose={closeModal} />
      <SignUpForm />
      <hr className="border-gray-200" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-500">
          すでにアカウントをお持ちの方はこちら
        </p>
        <UnderlineButton text="ログイン" onClick={() => openModal("login")} />
      </div>
    </div>
  );
}
