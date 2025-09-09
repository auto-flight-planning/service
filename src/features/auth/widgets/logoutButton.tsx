"use client";

import { RoundButton } from "@/components/button";
import getBrowserClient from "@/supabase/browserClient";

export default function LogoutButton() {
  const logout = async () => {
    const supabaseCli = await getBrowserClient();
    await supabaseCli.auth.signOut();
  };

  return <RoundButton text="ログアウト" size="small" onClick={logout} />;
}
