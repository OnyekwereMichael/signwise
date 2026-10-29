import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// The anon key is public by design: it ships to every visitor's browser.
// It is safe because the SQL in Step 2 only lets it add waitlist rows.
// Never put the service_role key in this app.
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;