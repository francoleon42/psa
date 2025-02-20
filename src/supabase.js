import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("🚨 Supabase URL o Key no están definidas. Revisa tu .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
