import { lazy, Suspense, useEffect } from "react";

import { useUserStore, useUIStore } from "./store/useStore";
import { useAdminStore } from "./store/useAdminStore";

import Loader from "./components/Loader";
import Cursor from "./components/Cursor";

import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useDeepLinking } from "./hooks/useDeepLinking";
import { useModalHistory } from "./hooks/useModalHistory";

// ── TEMPORARILY DISABLED ─────────────────────────────────────────────────────
// LoginGate and ProfileEdit are commented out while Supabase auth is inactive.
// Users land directly on the main page.  Re-enable by restoring the imports
// and the conditional renders below once Supabase is reconnected.
// ─────────────────────────────────────────────────────────────────────────────
// const LoginGate  = lazy(() => import("./components/LoginGate"));
// const ProfileEdit = lazy(() => import("./components/ProfileEdit"));

const Nav            = lazy(() => import("./components/Nav"));
const Ticker         = lazy(() => import("./components/Ticker"));
const Hero           = lazy(() => import("./components/Hero"));
const ResourceVault  = lazy(() => import("./components/ResourceVault"));
const Team           = lazy(() => import("./components/Team"));
const Footer         = lazy(() => import("./components/Footer"));
const PDFViewer      = lazy(() => import("./components/PDFViewer"));
const CGPACalculator = lazy(() => import("./components/CGPACalculator"));
const Dashboard      = lazy(() => import("./components/Dashboard"));
const QuickSearch    = lazy(() => import("./components/QuickSearch"));
const AdminGate      = lazy(() => import("./components/AdminGate"));
const AdminPanel     = lazy(() => import("./components/AdminPanel"));
const EasterEgg      = lazy(() => import("./components/EasterEgg"));

export default function App() {
  // Auth disabled: treat every visitor as a logged-in guest so the main
  // page renders immediately.  The real user object stays null in the store;
  // we pass a guest stub so auth-guarded components don't break.
  const GUEST_USER = { id: "guest", name: "Guest", isGuest: true };

  const kbOpen  = useUIStore((s) => s.kbOpen);
  const checkAdmin = useAdminStore((s) => s.checkAdmin);

  useKeyboardShortcuts();
  useDeepLinking();
  useModalHistory();

  useEffect(() => {
    // checkAdmin still runs but Supabase will return no session — safe to call.
    checkAdmin();
  }, [checkAdmin]);

  return (
    <Suspense fallback={<Loader />}>
      <Cursor />

      {/* Auth gate DISABLED — site opens directly */}
      {/* {!user && <LoginGate />} */}

      {/* Always show main content (guest mode) */}
      <>
        <Nav />
        <Ticker />

        <main>
          <Hero />
          <AdminPanel />
          <ResourceVault />
          <Team />
        </main>

        <Footer />

        <PDFViewer />
        <CGPACalculator />
        <Dashboard />
        <AdminGate />
        <EasterEgg />

        {/* ProfileEdit DISABLED — re-enable with auth */}
        {/* {modals?.profileEdit && (
          <ProfileEdit onClose={() => setModal("profileEdit", false)} />
        )} */}

        {kbOpen && <QuickSearch />}
      </>
    </Suspense>
  );
}
