"use client";

import { useModalStore } from "@/features/modal/modalStore";
import { SquareButton } from "@/components/button";

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
