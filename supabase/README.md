# /supabase — DB / Auth / Storage Layer

Supabase is the serverless backend for THE AID 2 TIMES.
This folder is for documentation, SQL migrations, and config references.

## Tables

| Table      | Purpose                                              |
|------------|------------------------------------------------------|
| profiles   | Student profiles (linked to Supabase auth users)     |
| resources  | Study material metadata (Google Drive URLs + meta)   |

## Auth

Supabase Email/Password auth is **temporarily disabled** on the frontend.
The site runs in guest mode until auth is reconnected.

To re-enable:
1. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `frontend/.env`
2. Uncomment the `LoginGate` import and `{!user && <LoginGate />}` block in `frontend/src/App.jsx`
3. Uncomment the profile/logout lines in `frontend/src/components/Nav.jsx`
4. Remove the placeholder fallback values in `frontend/src/lib/supabase.js`

## Storage

Avatar images are stored in Supabase Storage (bucket: `avatars`).
Resource files are NOT stored in Supabase — only Google Drive URLs are saved.

## How the three layers connect

```
Browser (Vite + React)
  ├── reads Supabase directly  →  /api/supabase (anon key, RLS enforced)
  └── calls Express API        →  /api/*         (server-side logic)

Express API (/backend)
  └── calls Supabase           →  service role key (bypasses RLS for admin ops)

Supabase
  ├── Auth     — user sessions
  ├── Database — profiles, resources
  └── Storage  — avatars
```
