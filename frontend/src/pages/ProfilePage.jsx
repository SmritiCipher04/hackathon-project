import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Calendar,
  Edit3,
  Globe,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Star,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "../hooks/useTranslation";
import { useAppStore } from "../stores/appStore";
import { getProfile, updateProfile } from "../utils/api";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी (Hindi)" },
  { code: "khasi", label: "Khasi" },
  { code: "mizo", label: "Mizo" },
];

export default function ProfilePage() {
  const { t } = useTranslation();
  const { currentUser, setCurrentUser, setLanguage } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name ?? "");
  const [location, setLocation] = useState(currentUser?.location ?? "");
  const [lang, setLang] = useState(currentUser?.language ?? "en");
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getProfile();
        if (data.success) {
          setProfileData(data.profile);
          setCurrentUser(data.user);
          setName(data.user.name || '');
          setLocation(data.user.location || '');
          setLang(data.user.language || 'en');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUser) {
      fetchProfile();
    }
  }, []);

  if (!currentUser) return null;

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const roleConfig = {
    farmer: {
      label: "Farmer",
      icon: <Sprout className="w-3.5 h-3.5" />,
      color: "bg-farm-green-pale text-farm-green border-farm-green/20",
    },
    buyer: {
      label: "Buyer",
      icon: <ShoppingBag className="w-3.5 h-3.5" />,
      color: "bg-farm-amber-pale text-farm-earth border-farm-amber/20",
    },
    admin: {
      label: "Admin",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: "bg-muted text-muted-foreground border-border",
    },
  };
  const rc = roleConfig[currentUser.role];

  // Star rating renderer
  function renderStars(rating) {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i <= Math.round(rating)
              ? "fill-farm-amber text-farm-amber"
              : "text-muted-foreground"
              }`}
          />
        ))}
      </div>
    );
  }

  async function handleSave() {
    if (!name.trim() || !location.trim()) {
      toast.error("Name and location are required");
      return;
    }
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("location", location.trim());
      formData.append("language", lang);

      const data = await updateProfile(formData);
      if (data.success) {
        setCurrentUser(data.user);
        setProfileData(data.profile);
        setLanguage(lang);
        toast.success(t("profile.saved"));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  }

  function handleCancel() {
    setName(currentUser.name);
    setLocation(currentUser.location);
    setLang(currentUser.language);
    setIsEditing(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 py-12"
    >
      <h1 className="font-display font-bold text-3xl text-foreground mb-8">
        {t("profile.title")}
      </h1>

      {/* Profile card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Cover art */}
        <div className="h-24 bg-gradient-to-r from-farm-green/20 via-farm-amber/15 to-farm-green/10 relative">
          <div className="absolute inset-0 leaf-bg opacity-50" />
        </div>

        {/* Avatar + info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <Avatar className="h-16 w-16 border-4 border-card shadow-card">
              <AvatarFallback className="bg-primary text-primary-foreground font-display font-bold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {t("profile.editProfile")}
              </Button>
            )}
          </div>

          {/* Role badge */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className={`gap-1 ${rc.color}`}>
              {rc.icon}
              {rc.label}
            </Badge>
            {currentUser.ratingCount > 0 && (
              <div className="flex items-center gap-1.5">
                {renderStars(currentUser.rating)}
                <span className="text-sm text-muted-foreground">
                  {currentUser.rating.toFixed(1)} ({currentUser.ratingCount}{" "}
                  {t("profile.reviews").toLowerCase()})
                </span>
              </div>
            )}
          </div>

          {/* Form / display */}
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <User className="w-3.5 h-3.5" />
                  {t("common.name")}
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  {t("common.location")}
                </Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Globe className="w-3.5 h-3.5" />
                  {t("auth.language")}
                </Label>
                <Select value={lang} onValueChange={setLang}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l.code} value={l.code}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  {isSaving ? (
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {t("profile.save")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {[
                {
                  label: t("common.name"),
                  value: currentUser.name,
                  icon: <User className="w-4 h-4" />,
                },
                {
                  label: t("common.phone"),
                  value: `+91 ${currentUser.phone}`,
                  icon: <Phone className="w-4 h-4" />,
                },
                {
                  label: t("common.location"),
                  value: currentUser.location,
                  icon: <MapPin className="w-4 h-4" />,
                },
                {
                  label: t("auth.language"),
                  value:
                    LANGUAGES.find((l) => l.code === currentUser.language)
                      ?.label ?? currentUser.language,
                  icon: <Globe className="w-4 h-4" />,
                },
                {
                  label: t("profile.memberSince"),
                  value: new Date(currentUser.createdAt).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "long", year: "numeric" },
                  ),
                  icon: <Calendar className="w-4 h-4" />,
                },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="font-medium text-sm text-foreground">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Farmer stats (farmer only) */}
      {currentUser.role === "farmer" && (
        <div className="mt-4 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-farm-amber" />
            {t("profile.rating")} & {t("profile.reviews")}
          </h3>
          {(currentUser.ratingCount || 0) === 0 ? (
            <p className="text-sm text-muted-foreground">
              No ratings yet. Complete more transactions to get rated.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="font-display font-bold text-4xl text-foreground">
                    {(currentUser.rating || 0).toFixed(1)}
                  </div>
                  <div className="mt-1">{renderStars(currentUser.rating || 0)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {currentUser.ratingCount || 0} reviews
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct =
                      star === 5
                        ? 55
                        : star === 4
                          ? 30
                          : star === 3
                            ? 10
                            : star === 2
                              ? 3
                              : 2;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-3">
                          {star}
                        </span>
                        <Star className="w-3 h-3 fill-farm-amber text-farm-amber" />
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-farm-amber rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-6 text-right">
                          {pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
