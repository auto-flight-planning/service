import { RoundButton } from "@/client/components/button";
import createBrowserClient from "@/server/supabase/browserClient";

export default function LogoutButton() {
  const supabaseCli = createBrowserClient();

  return (
    <RoundButton text="ログアウト" onClick={() => supabaseCli.auth.signOut()} />
  );
}
