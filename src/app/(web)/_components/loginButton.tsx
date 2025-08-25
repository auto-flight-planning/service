"use client";

import { useModalStore } from "@/client/stores";
import { SquareButton } from "@/client/components/button";

export default function LoginButton() {
  const { openModal } = useModalStore();

  return (
    <SquareButton
      text="システムにログイン"
      onClick={() => openModal("login")}
      size="large"
    />
  );
}
