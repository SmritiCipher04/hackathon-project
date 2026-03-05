import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  Heart,
  IndianRupee,
  MapPin,
  Package,
  PhoneCall,
  ShoppingBag,
  Sprout,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import { useAppStore } from "../stores/appStore";

// ── Status badge ──────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const config = {
    pending: {
      cls: "badge-pending",
      icon: <Clock className="w-2.5 h-2.5" />,
      label: "Pending",
    },
    contacted: {
      cls: "badge-contacted",
      icon: <PhoneCall className="w-2.5 h-2.5" />,
      label: "Contacted",
    },
    closed: {
      cls: "badge-closed",
      icon: <XCircle className="w-2.5 h-2.5" />,
      label: "Closed",
    },
  };
  const { cls, icon, label } = config[status] ?? config.pending;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${cls}`}
    >
      {icon}
      {label}
    </span>
  );
}

export default function BuyerDashboard() {
  const { t } = useTranslation();
  const { currentUser, interests, products, setCurrentPage } = useAppStore();

  const myInterests = interests.filter((i) => i.buyerId === currentUser?.id);

  // Enrich interest with product data
  const enriched = myInterests.map((interest) => {
    const product = products.find((p) => p.id === interest.productId);
    return { interest, product };
  });

  const stats = {
    total: myInterests.length,
    pending: myInterests.filter((i) => i.status === "pending").length,
    contacted: myInterests.filter((i) => i.status === "contacted").length,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">
          {t("nav.dashboard")}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track your product interests and connections
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          {
            label: "Total Interests",
            value: stats.total,
            icon: <Heart className="w-4 h-4 text-farm-amber" />,
          },
          {
            label: "Awaiting Reply",
            value: stats.pending,
            icon: <Clock className="w-4 h-4 text-yellow-600" />,
          },
          {
            label: "Contacted",
            value: stats.contacted,
            icon: <PhoneCall className="w-4 h-4 text-primary" />,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4 text-center"
          >
            <div className="flex justify-center mb-1">{stat.icon}</div>
            <div className="font-display font-bold text-xl text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-foreground">
          {t("interests.myInterests")}
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={() => setCurrentPage("marketplace")}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Browse More
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>

      {/* Interests list */}
      {enriched.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-farm-amber-pale flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-farm-amber/60" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg">
            {t("interests.noInterests")}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 max-w-xs">
            Browse the marketplace and express interest in products you want to
            buy.
          </p>
          <Button
            onClick={() => setCurrentPage("marketplace")}
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Go to Marketplace
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {enriched.map(({ interest, product }) => (
            <motion.div
              key={interest.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Product image */}
                  {product && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                      <img
                        src={product.imageUrl}
                        alt={product.cropName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23f0fdf4'/%3E%3Ctext x='28' y='36' text-anchor='middle' font-size='24'%3E🌿%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">
                          {interest.productName}
                        </h3>
                        {product && (
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-0.5">
                              <IndianRupee className="w-2.5 h-2.5" />
                              {product.price}/kg
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Package className="w-2.5 h-2.5" />
                              {product.quantity}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <MapPin className="w-2.5 h-2.5" />
                              {product.location.split(",")[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <StatusBadge status={interest.status} />
                    </div>

                    {/* Message */}
                    <div className="mt-2 text-xs text-muted-foreground bg-muted rounded-lg p-2">
                      &ldquo;{interest.message}&rdquo;
                    </div>

                    {/* Farmer info (when contacted) */}
                    {interest.status === "contacted" && (
                      <div className="mt-3 p-2.5 bg-farm-green-pale border border-farm-green/20 rounded-xl">
                        <p className="text-xs font-medium text-primary mb-1 flex items-center gap-1.5">
                          <Sprout className="w-3 h-3" />
                          Farmer Contact Info
                        </p>
                        <div className="text-xs text-foreground space-y-0.5">
                          <div className="font-medium">
                            {products.find((p) => p.id === interest.productId)
                              ?.farmerName ?? "Farmer"}
                          </div>
                          <div className="text-muted-foreground">
                            The farmer will reach out to discuss your order.
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-2 text-xs text-muted-foreground">
                      Expressed on{" "}
                      {new Date(interest.createdAt).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick nav to marketplace */}
      {enriched.length > 0 && (
        <div className="mt-6 bg-farm-amber-pale border border-farm-amber/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-sm text-foreground">
              Looking for more products?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Browse fresh listings from farmers across India
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setCurrentPage("marketplace")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 flex-shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Marketplace
          </Button>
        </div>
      )}
    </div>
  );
}

// suppress unused
void Badge;
void Sprout;
