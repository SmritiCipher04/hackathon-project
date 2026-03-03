import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  CheckCircle,
  Heart,
  IndianRupee,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { sampleUsers } from "../data/sampleData";
import { useTranslation } from "../hooks/useTranslation";
import { useAppStore } from "../stores/appStore";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { products, interests } = useAppStore();

  // Use all sample users for admin view
  const allUsers = sampleUsers;

  const stats = useMemo(() => {
    const farmers = allUsers.filter((u) => u.role === "farmer").length;
    const buyers = allUsers.filter((u) => u.role === "buyer").length;
    const activeProducts = products.filter((p) => p.status === "active").length;
    return {
      totalUsers: allUsers.length,
      farmers,
      buyers,
      totalProducts: products.length,
      activeProducts,
      totalInterests: interests.length,
    };
  }, [allUsers, products, interests]);

  const statCards = [
    {
      label: t("admin.totalUsers"),
      value: stats.totalUsers,
      icon: <Users className="w-5 h-5" />,
      color: "text-primary bg-farm-green-pale",
    },
    {
      label: t("admin.farmers"),
      value: stats.farmers,
      icon: <Sprout className="w-5 h-5" />,
      color: "text-primary bg-farm-green-pale",
    },
    {
      label: t("admin.buyers"),
      value: stats.buyers,
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "text-farm-earth bg-farm-amber-pale",
    },
    {
      label: t("admin.totalProducts"),
      value: stats.totalProducts,
      icon: <Package className="w-5 h-5" />,
      color: "text-primary bg-farm-green-pale",
    },
    {
      label: t("admin.activeProducts"),
      value: stats.activeProducts,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-emerald-700 bg-emerald-50",
    },
    {
      label: t("admin.totalInterests"),
      value: stats.totalInterests,
      icon: <Heart className="w-5 h-5" />,
      color: "text-farm-earth bg-farm-amber-pale",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            {t("admin.dashboard")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("admin.overview")}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          Platform Analytics
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-card transition-shadow"
          >
            <div
              className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mx-auto mb-2`}
            >
              {card.icon}
            </div>
            <div className="font-display font-bold text-2xl text-foreground">
              {card.value}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ── All Users table ────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-display font-semibold text-base text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              {t("admin.allUsers")}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs">{t("common.name")}</TableHead>
                  <TableHead className="text-xs">{t("common.role")}</TableHead>
                  <TableHead className="text-xs">
                    {t("common.location")}
                  </TableHead>
                  <TableHead className="text-xs">{t("common.date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-farm-green-pale flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="font-medium text-xs text-foreground">
                            {user.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Phone className="w-2.5 h-2.5" />
                            {user.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${user.role === "farmer"
                            ? "border-farm-green/30 text-primary bg-farm-green-pale"
                            : user.role === "buyer"
                              ? "border-farm-amber/30 text-farm-earth bg-farm-amber-pale"
                              : "border-border text-muted-foreground"
                          }`}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate max-w-[80px]">
                          {user.location.split(",")[0]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* ── All Products table ─────────────────────────────────── */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-display font-semibold text-base text-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              {t("admin.allProducts")}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs">Crop</TableHead>
                  <TableHead className="text-xs">Farmer</TableHead>
                  <TableHead className="text-xs">Price</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.slice(0, 12).map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/30">
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={product.imageUrl}
                            alt={product.cropName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Crect width='28' height='28' fill='%23f0fdf4'/%3E%3Ctext x='14' y='19' text-anchor='middle' font-size='14'%3E🌿%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground line-clamp-1">
                          {product.cropName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {product.farmerName}
                      </span>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-0.5 text-xs font-medium text-foreground">
                        <IndianRupee className="w-2.5 h-2.5" />
                        {product.price}/kg
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${product.status === "active"
                            ? "badge-active"
                            : "badge-sold"
                          }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
