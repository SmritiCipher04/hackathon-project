import { Toaster } from "@/components/ui/sonner";
import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "./hooks/useTranslation";
import { useAppStore } from "./stores/appStore";
import { requestForToken, onMessageListener } from "./firebase";
import api from "./utils/api";

import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AuthPage from "./pages/AuthPage";
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import MarketplacePage from "./pages/MarketplacePage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";

// ── Offline indicator ─────────────────────────────────────────────────────
function OfflineBar() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium">
      <WifiOff className="w-4 h-4" />
      <span>
        {t("common.offline")} — {t("common.offlineDesc")}
      </span>
    </div>
  );
}

// ── Page transition wrapper ───────────────────────────────────────────────
function PageTransition({ children, pageKey }) {
  return children;
  /*
  const { AnimatePresence, motion } = require("motion/react");
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
  */
}

// ── Main app ──────────────────────────────────────────────────────────────
export default function App() {
  const { currentUser, currentPage } = useAppStore();

  // Not logged in → show auth
  if (!currentUser) {
    return (
      <>
        <AuthPage />
        <Toaster position="top-right" richColors />
        <OfflineBar />
      </>
    );
  }

  // Render page based on currentPage
  function renderPage() {
    switch (currentPage) {
      case "farmerDashboard":
        return currentUser?.role === "farmer" ||
          currentUser?.role === "admin" ? (
          <FarmerDashboard />
        ) : (
          <MarketplacePage />
        );
      case "buyerDashboard":
        return currentUser?.role === "buyer" ||
          currentUser?.role === "admin" ? (
          <BuyerDashboard />
        ) : (
          <MarketplacePage />
        );
      case "notifications":
        return <NotificationsPage />;
      case "profile":
        return <ProfilePage />;
      case "admin":
        return currentUser?.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <MarketplacePage />
        );
      default:
        return <MarketplacePage />;
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <PageTransition pageKey={currentPage}>{renderPage()}</PageTransition>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 px-4 sm:px-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">Local Connect</span>.
          Built with ❤️ team{" "}
          <a
            href={``}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            system.in
          </a>
        </p>
      </footer>

      <Toaster position="top-right" richColors />
      <OfflineBar />
    </div>
  );
}
