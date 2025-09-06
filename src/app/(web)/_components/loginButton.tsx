"use client";

import { useModalStore } from "@/features/modal";
import { SquareButton } from "@/components/button";
import getBrowserClient from "@/supabase/browserClient";

export default function LoginButton() {
  const { openModal } = useModalStore();

  const tempLogin = async () => {
    const supabase = await getBrowserClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "user1@example.com",
      password: "password1",
    });
    console.log(data, error);
  };

  return (
    <SquareButton
      text="システムにログイン"
      onClick={tempLogin}
      // onClick={() => openModal("login")}
      size="large"
    />
  );
}
