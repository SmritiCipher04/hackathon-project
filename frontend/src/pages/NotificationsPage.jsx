import { Button } from "@/components/ui/button";
import {
  Bell,
  BellOff,
  CheckCheck,
  Info,
  Package,
  ShoppingBag,
  Sprout,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "../hooks/useTranslation";
import { useAppStore } from "../stores/appStore";

// ── Notification icon by type ─────────────────────────────────────────────
function NotifIcon({ type }) {
  const config = {
    interest: {
      icon: <Sprout className="w-4 h-4 text-primary" />,
      bg: "bg-farm-green-pale",
    },
    interest_update: {
      icon: <ShoppingBag className="w-4 h-4 text-farm-amber" />,
      bg: "bg-farm-amber-pale",
    },
    new_listing: {
      icon: <Package className="w-4 h-4 text-primary" />,
      bg: "bg-farm-green-pale",
    },
    listing: {
      icon: <Star className="w-4 h-4 text-farm-amber" />,
      bg: "bg-farm-amber-pale",
    },
    info: {
      icon: <Info className="w-4 h-4 text-muted-foreground" />,
      bg: "bg-muted",
    },
  };
  const { icon, bg } = config[type] ?? config.info;
  return (
    <div
      className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
    >
      {icon}
    </div>
  );
}

// ── Time ago formatter ─────────────────────────────────────────────────────
function timeAgo(date) {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function NotificationsPage() {
  const { t } = useTranslation();
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    currentUser,
  } = useAppStore();

  const myNotifs = notifications
    .filter((n) => n.userId === currentUser?.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const unreadCount = myNotifs.filter((n) => !n.readStatus).length;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            {t("notifications.title")}
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {unreadCount} {t("notifications.unread")}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllNotificationsRead}
            className="gap-1.5 text-xs"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            {t("notifications.markAllRead")}
          </Button>
        )}
      </div>

      {/* Notifications list */}
      {myNotifs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <BellOff className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg">
            {t("notifications.noNotifications")}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            {t("notifications.noNotificationsDesc")}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {myNotifs.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() =>
                  !notif.readStatus && markNotificationRead(notif.id)
                }
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${notif.readStatus
                    ? "bg-card border-border"
                    : "bg-card border-primary/30 shadow-sm ring-1 ring-primary/10"
                  }`}
              >
                <NotifIcon type={notif.notifType} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm leading-relaxed ${notif.readStatus ? "text-muted-foreground" : "text-foreground font-medium"}`}
                    >
                      {notif.message}
                    </p>
                    {!notif.readStatus && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-muted-foreground">
                      {timeAgo(notif.createdAt)}
                    </span>
                    {!notif.readStatus && (
                      <span className="text-xs text-primary font-medium">
                        {t("notifications.new")}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Hint */}
      {myNotifs.length > 0 && unreadCount > 0 && (
        <p className="text-center text-xs text-muted-foreground mt-6">
          Click a notification to mark it as read
        </p>
      )}

      {/* All read state */}
      {myNotifs.length > 0 && unreadCount === 0 && (
        <div className="flex items-center justify-center gap-2 mt-8 py-4 text-muted-foreground">
          <Bell className="w-4 h-4" />
          <span className="text-sm">
            {t("notifications.noNotificationsDesc")}
          </span>
        </div>
      )}
    </div>
  );
}
