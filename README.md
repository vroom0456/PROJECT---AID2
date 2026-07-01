# THE AID 2 TIMES

Student resource platform for AID branch.

## Project Structure

```
THE-AID-2-TIMES/
├── frontend/        Vite + React (UI only)
├── backend/         Node.js Express API (new learning layer)
└── supabase/        DB / Auth / Storage docs & migrations
```

## Quick Start

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # fill in Supabase keys (or leave blank for guest mode)
npm run dev            # → http://localhost:5173
```

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in SUPABASE_SERVICE_KEY
npm run dev            # → http://localhost:4000
```

## Auth Status

⚠️ **Supabase auth is temporarily disabled.**
The site opens directly to the main page (guest mode).
See `supabase/README.md` for re-enable instructions.
