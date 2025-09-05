import { RoundButton } from "@/components/button";
import createBrowserClient from "@/supabase/browserClient";

export default function LogoutButton() {
  const supabaseCli = createBrowserClient();

  return (
    <RoundButton text="ログアウト" onClick={() => supabaseCli.auth.signOut()} />
  );
}
