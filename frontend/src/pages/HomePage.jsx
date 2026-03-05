import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import {
    ArrowRight,
    Sprout,
    ShoppingBag,
    Globe,
    ShieldCheck,
    Zap,
    CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
    const { t } = useTranslation();

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.1 } },
        viewport: { once: true }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-b from-farm-green-pale/50 to-background">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.2 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src="/artifacts/meghalaya_farm_hero_1772729701685.png"
                        alt="Meghalaya Farm"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
                </div>

                <div className="container relative z-10 px-6 mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="max-w-2xl space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                            <Sprout className="w-3.5 h-3.5" />
                            <span>Northeast India's Digital Marketplace</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-foreground leading-[1.1]">
                            {t("home.heroTitle")}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                            {t("home.heroSubtitle")}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild size="lg" className="h-14 px-8 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all text-base font-semibold">
                                <Link to="/marketplace" className="flex items-center gap-2">
                                    {t("home.browseMarketplace")}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-2 hover:bg-muted text-base font-semibold">
                                <Link to="/dashboard">
                                    {t("home.startSelling")}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="/artifacts/fresh_produce_basket_1772729731157.png"
                                alt="Fresh Produce"
                                className="w-full aspect-[4/5] object-cover"
                            />
                        </div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-farm-amber/20 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-card">
                <div className="container px-6 mx-auto">
                    <motion.div
                        {...fadeInUp}
                        className="text-center max-w-2xl mx-auto mb-16 space-y-4"
                    >
                        <h2 className="text-3xl lg:text-4xl font-display font-bold">{t("home.howItWorks")}</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: <Sprout className="w-8 h-8" />,
                                title: t("home.how1"),
                                color: "bg-farm-green-pale text-farm-green"
                            },
                            {
                                icon: <ShoppingBag className="w-8 h-8" />,
                                title: t("home.how2"),
                                color: "bg-farm-amber-pale text-farm-earth"
                            },
                            {
                                icon: <CheckCircle2 className="w-8 h-8" />,
                                title: t("home.how3"),
                                color: "bg-blue-50 text-blue-600"
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="group p-8 rounded-[2rem] bg-background border border-border hover:border-primary/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">Step {i + 1}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.title}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24">
                <div className="container px-6 mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            {...fadeInUp}
                            className="lg:w-1/2 space-y-6"
                        >
                            <h2 className="text-4xl font-display font-bold leading-tight">
                                {t("home.featuresTitle")}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Advanced tools designed for regional agriculture. We bridge the linguistic and digital divide.
                            </p>

                            <div className="space-y-4 pt-4">
                                {[
                                    { icon: <Globe />, text: t("home.feature1") },
                                    { icon: <Zap />, text: t("home.feature2") },
                                    { icon: <ShieldCheck />, text: t("home.feature3") }
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border/50">
                                        <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm">
                                            {feature.icon}
                                        </div>
                                        <span className="font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="pt-12 space-y-4"
                            >
                                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-border">
                                    <img src="/artifacts/fresh_produce_basket_1772729731157.png" alt="Crop" className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-[4/3] rounded-3xl bg-primary flex flex-col justify-end p-6 text-primary-foreground italic">
                                    <p>"Technology is the new seed for our future harvests."</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-4"
                            >
                                <div className="aspect-[3/4] rounded-3xl bg-farm-amber p-6 flex flex-col justify-between">
                                    <ShoppingBag className="w-12 h-12 text-farm-earth opacity-20" />
                                    <div className="space-y-1">
                                        <p className="text-3xl font-display font-bold text-farm-earth">100%</p>
                                        <p className="text-xs font-bold uppercase tracking-widest text-farm-earth/60">Direct Trade</p>
                                    </div>
                                </div>
                                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-border">
                                    <img src="/artifacts/meghalaya_farm_hero_1772729701685.png" alt="Farmer" className="w-full h-full object-cover" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[100px]"></div>
                <motion.div
                    {...fadeInUp}
                    className="container relative z-10 px-6 mx-auto text-center max-w-4xl"
                >
                    <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8">
                        {t("home.impactTitle")}
                    </h2>
                    <p className="text-xl opacity-90 leading-relaxed mb-12">
                        {t("home.impactDesc")}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { val: "5000+", label: "Farmers" },
                            { val: "20+", label: "Districts" },
                            { val: "100%", label: "Fair Price" },
                            { val: "24/7", label: "Support" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <p className="text-3xl font-bold">{stat.val}</p>
                                <p className="text-sm opacity-60 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
