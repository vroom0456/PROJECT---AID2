/**
 * THE AID 2 TIMES — Express API (Learning Layer)
 *
 * This is the NEW Node.js/Express backend.  It sits alongside Supabase:
 *   - Supabase still handles Auth, DB, and Storage directly.
 *   - This server is for learning / future server-side logic (custom
 *     endpoints, scheduled tasks, webhook handling, business logic that
 *     shouldn't live in the browser, etc.).
 *
 * Run:  npm run dev   (uses nodemon)
 *       npm start     (plain node)
 *
 * Default port: 4000  (frontend Vite proxy: /api → http://localhost:4000)
 */

import express from "express";
import cors    from "cors";
import dotenv  from "dotenv";

import resourceRoutes from "./routes/resources.js";
import healthRoutes   from "./routes/health.js";

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/health",    healthRoutes);
app.use("/api/resources", resourceRoutes);

// ── 404 catch-all ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅  API server running at http://localhost:${PORT}`);
});
