import { create } from "zustand";
import { supabase } from "../lib/supabase";

export const useAdminStore = create((set) => ({
  adminSession: null,
  adminEmail: null,
  loading: false,

  login: async (email, password) => {
    try {
      set({ loading: true });
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { set({ loading: false }); return { success: false, message: error.message }; }

      const { data: { user } } = await supabase.auth.getUser();

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        set({ loading: false });
        return { success: false, message: "Not an admin account." };
      }

      set({ adminSession: user?.id, adminEmail: user?.email, loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return { success: false, message: err.message };
    }
  },

  logout: async () => {
    try { await supabase.auth.signOut(); } catch (_) { /* supabase offline */ }
    set({ adminSession: null, adminEmail: null });
  },

  // ── TEMPORARILY SAFE ───────────────────────────────────────────────────────
  // checkAdmin silently no-ops when Supabase is unreachable / unconfigured.
  // ──────────────────────────────────────────────────────────────────────────
  checkAdmin: async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (!session) { set({ adminSession: null, adminEmail: null }); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role === "admin") {
        set({ adminSession: session.user.id, adminEmail: session.user.email });
      } else {
        set({ adminSession: null, adminEmail: null });
      }
    } catch (_) {
      // Supabase not configured — swallow silently, admin stays null
      set({ adminSession: null, adminEmail: null });
    }
  },
}));
