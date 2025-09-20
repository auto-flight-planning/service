"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client/browser";
import { RoundButton } from "@/components/button";

export default function LogoutButton() {
  const logout = async () => {
    const supabaseCli = createSupabaseBrowserClient();
    await supabaseCli.auth.signOut();
  };

  return <RoundButton text="ログアウト" size="sm" onClick={logout} />;
}
