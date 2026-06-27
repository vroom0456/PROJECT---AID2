/**
 * /api/resources — thin proxy over Supabase for server-side mutations.
 * Expand with validation, rate-limiting, caching, etc. as you learn Express.
 */
import { Router }       from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv           from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL         || "",
  process.env.SUPABASE_SERVICE_KEY || ""
);
const router = Router();

// GET /api/resources?branch=AIDS&semester=V
router.get("/", async (req, res) => {
  const { branch, semester } = req.query;
  if (!branch || !semester)
    return res.status(400).json({ error: "branch and semester query params required" });
  const { data, error } = await supabase
    .from("resources").select("*")
    .eq("branch", branch).eq("semester", semester)
    .order("created_at", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

// POST /api/resources  (wire in requireAdmin middleware when ready)
router.post("/", async (req, res) => {
  const { title, branch, semester, subject, unit, category, drive_url, drive_file_id, uploaded_by } = req.body;
  const { data, error } = await supabase.from("resources")
    .insert({ title, branch, semester, subject, unit: unit || null, category, drive_url, drive_file_id, uploaded_by, created_at: new Date().toISOString() })
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ data });
});

// DELETE /api/resources/:id
router.delete("/:id", async (req, res) => {
  const { error } = await supabase.from("resources").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;
