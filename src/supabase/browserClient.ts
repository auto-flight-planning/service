import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let supabaseBrowserClient: SupabaseClient | null = null;

export default async function getBrowserClient() {
  if (supabaseBrowserClient) {
    return supabaseBrowserClient;
  }

  supabaseBrowserClient = createBrowserClient(supabaseUrl, supabaseKey);

  return supabaseBrowserClient;
}
