import { useTranslation } from "@/hooks/useTranslation";
import { Leaf, Target, Eye, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
    const { t } = useTranslation();

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.15 } },
        viewport: { once: true }
    };

    const sections = [
        {
            title: t("about.problem"),
            desc: t("about.problemDesc"),
            icon: <Users className="w-8 h-8 text-farm-earth" />,
            bg: "bg-farm-amber-pale"
        },
        {
            title: t("about.mission"),
            desc: t("about.missionDesc"),
            icon: <Leaf className="w-8 h-8 text-farm-green" />,
            bg: "bg-farm-green-pale"
        },
        {
            title: t("about.vision"),
            desc: t("about.visionDesc"),
            icon: <Eye className="w-8 h-8 text-primary" />,
            bg: "bg-primary/10"
        }
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background">
            <div className="container px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight">
                        {t("about.title")}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">
                        "Empowering the hands that feed us."
                    </p>
                    <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid gap-12">
                    {sections.map((section, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-8 p-10 rounded-[2.5rem] border border-border/50 hover:shadow-2xl transition-all duration-500 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className={`w-28 h-28 flex-shrink-0 rounded-3xl ${section.bg} flex items-center justify-center shadow-inner`}>
                                {section.icon}
                            </div>
                            <div className="space-y-4 flex-1">
                                <h2 className="text-3xl font-display font-bold">{section.title}</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {section.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    {...fadeInUp}
                    className="mt-24 p-12 rounded-[3.5rem] bg-card border border-border text-center overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-primary/5 -z-10"></div>
                    <h2 className="text-3xl font-display font-bold mb-6">Our Values</h2>
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {['Transparency', 'Community', 'Innovation', 'Fairness'].map((val, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="space-y-2"
                            >
                                <div className="w-12 h-12 rounded-full bg-background border border-primary/20 flex items-center justify-center mx-auto text-primary">
                                    <Target className="w-6 h-6" />
                                </div>
                                <p className="font-bold text-sm uppercase tracking-widest">{val}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
