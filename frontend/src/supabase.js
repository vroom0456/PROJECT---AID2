import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ── TEMPORARILY DISABLED ─────────────────────────────────────────────────────
// Supabase auth is commented out while auth/profile issues are resolved.
// The site opens directly to the main page (no login gate).
// To re-enable: restore the env vars in .env and uncomment the checks below.
// ─────────────────────────────────────────────────────────────────────────────

// if (!supabaseUrl) throw new Error("VITE_SUPABASE_URL missing");
// if (!supabaseAnonKey) throw new Error("VITE_SUPABASE_ANON_KEY missing");

export const supabase = createClient(
  supabaseUrl  || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
