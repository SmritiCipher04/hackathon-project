import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  Eye,
  Filter,
  IndianRupee,
  Leaf,
  MapPin,
  Package,
  Search,
  Send,
  SlidersHorizontal,
  Sprout,
  Star,
  Wheat,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "../hooks/useTranslation";
import { useAppStore } from "../stores/appStore";
import { getAllPosts } from "../utils/api";

// ── Unique locations from products ────────────────────────────────────────
function getLocations(products) {
  const locs = new Set(products.map((p) => (p.location || '').split(",")[0].trim()).filter(Boolean));
  return Array.from(locs).sort();
}

// ── Star rating display ───────────────────────────────────────────────────
function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 fill-farm-amber text-farm-amber" />
      <span className="text-xs font-medium text-foreground">
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-muted-foreground">({count})</span>
    </div>
  );
}

// ── Product card ──────────────────────────────────────────────────────────
function ProductCard({
  product,
  isOwner,
  isBuyer,
  onInterested,
  onView,
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-card rounded-[2rem] border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={product.images?.[0] || product.imageUrl || "/artifacts/fresh_produce_basket_1772729731157.png"}
          alt={product.cropName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0fdf4'/%3E%3Ctext x='200' y='155' text-anchor='middle' font-size='48'%3E🌿%3C/text%3E%3C/svg%3E";
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 scale-90 origin-top-right">
          <Badge className="bg-white/90 backdrop-blur-md text-primary hover:bg-white font-bold px-3 py-1 rounded-full shadow-sm">
            ₹{product.price}/{t("products.kg")}
          </Badge>
          <Badge
            className={`backdrop-blur-md border-0 px-3 py-1 rounded-full font-bold shadow-sm ${product.status === "active"
              ? "bg-emerald-500 text-white"
              : "bg-gray-500 text-white"
              }`}
          >
            {product.status === "active" ? t("products.active") : t("products.sold")}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.cropName}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-muted/30">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">
              Quantity
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Package className="w-3 h-3 text-primary/60" />
              {product.quantity} kg
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">
              Location
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <MapPin className="w-3 h-3 text-primary/60" />
              <span className="truncate">{product.location}</span>
            </div>
          </div>
        </div>

        {/* Farmer Info */}
        <div className="flex items-center gap-2 border-t border-border pt-4">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xs font-bold text-muted-foreground truncate">
            {product.userId?.name || product.farmerName || 'Unknown Farmer'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onView(product)}
            className="flex-1 h-9 text-[11px] gap-1.5 rounded-xl border-2 hover:bg-muted font-bold"
          >
            <Eye className="w-3.5 h-3.5" />
            {t("products.viewDetail")}
          </Button>
          {isBuyer && product.status === "active" && !isOwner && (
            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                size="sm"
                onClick={() => onInterested(product)}
                className="w-full h-9 text-[11px] gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold shadow-lg shadow-primary/20"
              >
                <Send className="w-3.5 h-3.5" />
                {t("products.interested")}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main marketplace ──────────────────────────────────────────────────────
export default function MarketplacePage() {
  const { t } = useTranslation();
  const { products, setProducts, currentUser, addInterest, addNotification, interests } =
    useAppStore();

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [statusFilter, setStatusFilter] = useState("active");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [interestProduct, setInterestProduct] = useState(null);
  const [interestMessage, setInterestMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts from backend API on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllPosts();
        if (data.success) {
          setProducts(data.posts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load marketplace listings');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [setProducts]);

  const locations = getLocations(products);
  const maxProductPrice = Math.max(...products.map((p) => p.price), 500);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchSearch = search.trim()
          ? (p.cropName || '').toLowerCase().includes(search.toLowerCase()) ||
          (p.description || '').toLowerCase().includes(search.toLowerCase()) ||
          (p.userId?.name || p.farmerName || '').toLowerCase().includes(search.toLowerCase())
          : true;
        const matchLocation =
          locationFilter === "all" ||
          (p.location || '').toLowerCase().includes(locationFilter.toLowerCase());
        const matchPrice = p.price >= minPrice && p.price <= maxPrice;
        const matchStatus = statusFilter === "all" || p.status === statusFilter;
        return matchSearch && matchLocation && matchPrice && matchStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [products, search, locationFilter, minPrice, maxPrice, statusFilter]);

  const hasActiveFilters =
    search.trim() !== "" ||
    locationFilter !== "all" ||
    minPrice !== 0 ||
    maxPrice !== maxProductPrice ||
    statusFilter !== "active";

  function clearFilters() {
    setSearch("");
    setLocationFilter("all");
    setMinPrice(0);
    setMaxPrice(maxProductPrice);
    setStatusFilter("active");
  }

  async function handleInterest() {
    if (!interestProduct || !currentUser) return;

    setIsSubmitting(true);
    try {
      await api.post("/interests/create", {
        postId: interestProduct._id || interestProduct.id,
        farmerId: interestProduct.userId?._id || interestProduct.userId || interestProduct.farmerId,
        message: interestMessage.trim() || t("interests.defaultMessage"),
      });

      toast.success(t("interests.interestSent"));
      setInterestProduct(null);
      setInterestMessage("");
    } catch (error) {
      console.error("Error expressing interest:", error);
      const msg = error.response?.data?.error || "Error expressing interest";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero banner ────────────────────────────────────────────────── */}
      <div className="relative h-40 md:h-64 overflow-hidden">
        <img
          src="/artifacts/meghalaya_farm_hero_1772729701685.png"
          alt="Farm marketplace"
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 md:px-10">
          <div>
            <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>Fresh from the farm</span>
            </div>
            <h1 className="font-display font-bold text-white text-2xl md:text-3xl">
              {t("nav.marketplace")}
            </h1>
            <p className="text-white/80 text-sm mt-1">
              {filteredProducts.length} products from local farmers
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ── Search + filter bar ─────────────────────────────────────── */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("products.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`gap-2 ${showFilters ? "bg-farm-green-pale border-primary text-primary" : ""}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">{t("products.filter")}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-primary rounded-full" />
            )}
          </Button>
        </div>

        {/* ── Expandable filters ──────────────────────────────────────── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-card border border-border rounded-xl p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {/* Location */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {t("products.location")}
                  </Label>
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {t("products.allLocations")}
                      </SelectItem>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Wheat className="w-3.5 h-3.5" />
                    Status
                  </Label>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("common.all")}</SelectItem>
                      <SelectItem value="active">
                        {t("products.status.active")}
                      </SelectItem>
                      <SelectItem value="sold">
                        {t("products.status.sold")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price range */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {t("products.price")} — ₹{minPrice} to ₹{maxPrice}
                  </Label>
                  <div className="flex items-center gap-3 pt-1">
                    <Input
                      type="number"
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(Math.max(0, Number(e.target.value)))
                      }
                      className="h-8 text-sm w-20"
                      placeholder="Min"
                    />
                    <div className="flex-1">
                      <Slider
                        value={[minPrice, maxPrice]}
                        min={0}
                        max={maxProductPrice}
                        step={5}
                        onValueChange={([min, max]) => {
                          setMinPrice(min);
                          setMaxPrice(max);
                        }}
                      />
                    </div>
                    <Input
                      type="number"
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(
                          Math.min(maxProductPrice, Number(e.target.value)),
                        )
                      }
                      className="h-8 text-sm w-20"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Clear filters */}
                {hasActiveFilters && (
                  <div className="sm:col-span-2 md:col-span-4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-3.5 h-3.5" />
                      {t("products.clearFilters")}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results count ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} results
            {search && (
              <span>
                {" "}
                for &ldquo;<strong>{search}</strong>&rdquo;
              </span>
            )}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronDown className="w-3.5 h-3.5" />
            {t("products.sortLatest")}
          </div>
        </div>

        {/* ── Product grid ────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-farm-green-pale flex items-center justify-center mb-4">
              <Wheat className="w-8 h-8 text-primary/60" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg">
              {t("products.noProducts")}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs">
              {t("products.noProductsDesc")}
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4 gap-2"
              >
                <X className="w-4 h-4" />
                {t("products.clearFilters")}
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  currentUserId={currentUser?.id ?? ""}
                  isOwner={product.userId?._id === currentUser?.id || product.userId === currentUser?.id}
                  isBuyer={currentUser?.role === "buyer"}
                  onInterested={setInterestProduct}
                  onView={setSelectedProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ── Product detail modal ─────────────────────────────────────── */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <div className="h-52 -mx-6 -mt-6 overflow-hidden rounded-t-lg">
                <img
                  src={selectedProduct.images?.[0] || selectedProduct.imageUrl}
                  alt={selectedProduct.cropName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f0fdf4'/%3E%3Ctext x='200' y='105' text-anchor='middle' font-size='48'%3E🌿%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <DialogHeader className="mt-4">
                <div className="flex items-start justify-between gap-4">
                  <DialogTitle className="font-display text-xl">
                    {selectedProduct.cropName}
                  </DialogTitle>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${selectedProduct.status === "active"
                      ? "badge-active"
                      : "badge-sold"
                      }`}
                  >
                    {selectedProduct.status === "active"
                      ? t("products.status.active")
                      : t("products.status.sold")}
                  </span>
                </div>
              </DialogHeader>

              <div className="grid gap-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: t("common.price"),
                      value: `₹${selectedProduct.price}/kg`,
                      icon: <IndianRupee className="w-3.5 h-3.5" />,
                    },
                    {
                      label: t("common.quantity"),
                      value: selectedProduct.quantity,
                      icon: <Package className="w-3.5 h-3.5" />,
                    },
                    {
                      label: t("common.location"),
                      value: selectedProduct.location,
                      icon: <MapPin className="w-3.5 h-3.5" />,
                    },
                    {
                      label: t("common.by"),
                      value: selectedProduct.userId?.name || selectedProduct.farmerName || 'Unknown',
                      icon: <Sprout className="w-3.5 h-3.5" />,
                    },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-muted rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                        {icon}
                        {label}
                      </div>
                      <div className="font-medium text-sm text-foreground">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground">
                  Posted on{" "}
                  {new Date(selectedProduct.createdAt).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </div>
              </div>

              {currentUser?.role === "buyer" &&
                selectedProduct.status === "active" && (
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        setSelectedProduct(null);
                        setInterestProduct(selectedProduct);
                      }}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {t("products.interested")}
                    </Button>
                  </DialogFooter>
                )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Express interest modal ───────────────────────────────────── */}
      <Dialog
        open={!!interestProduct}
        onOpenChange={() => setInterestProduct(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {t("products.interested")}
            </DialogTitle>
          </DialogHeader>
          {interestProduct && (
            <div className="space-y-4">
              <div className="bg-farm-green-pale rounded-xl p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={interestProduct.images?.[0] || interestProduct.imageUrl}
                    alt={interestProduct.cropName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23dcfce7'/%3E%3Ctext x='24' y='30' text-anchor='middle' font-size='24'%3E🌿%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">
                    {interestProduct.cropName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₹{interestProduct.price}/kg · {interestProduct.userId?.name || interestProduct.farmerName || 'Unknown'}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {t("interests.message")}
                </Label>
                <Textarea
                  placeholder="Tell the farmer about your requirement..."
                  value={interestMessage}
                  onChange={(e) => setInterestMessage(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setInterestProduct(null)}>
              {t("products.cancel")}
            </Button>
            <Button
              onClick={handleInterest}
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? "Sending..." : t("common.submit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
