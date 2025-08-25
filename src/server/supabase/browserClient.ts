import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default function createBrowserClient() {
  return _createBrowserClient(supabaseUrl, supabaseKey);
}
