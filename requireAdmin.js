/**
 * requireAdmin — verifies Supabase JWT + admin role.
 * Usage: router.post("/", requireAdmin, handler);
 */
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL         || "",
  process.env.SUPABASE_SERVICE_KEY || ""
);

export default async function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
  if (!token) return res.status(401).json({ error: "No token provided" });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: "Invalid token" });

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin")
    return res.status(403).json({ error: "Admin access required" });

  req.user = user;
  next();
}
