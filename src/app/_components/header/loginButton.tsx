import { useModalStore } from "@/client/stores";
import { RoundButton } from "@/client/components/button";

export default function LoginButton() {
  const { openModal } = useModalStore();

  return <RoundButton text="ログイン" onClick={() => openModal("login")} />;
}
