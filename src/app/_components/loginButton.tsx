"use client";

import { useModalStore } from "@/client/stores";
import { LoginModal } from "@/client/features/auth/login";
import { SquareButton } from "@/client/components/button";

export default function LoginButton() {
  const { openModal } = useModalStore();

  return (
    <SquareButton
      text="システムにログイン"
      onClick={() => openModal(<LoginModal />)}
      size="large"
    />
  );
}
