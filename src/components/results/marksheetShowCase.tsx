"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, Search, Award, FileText, Sparkles } from "lucide-react";
import { staggerItem } from "@/lib/animation-utils";
import { useRouter } from "next/navigation";

export const ExamMarkSheetReviewer = () => {
    const router = useRouter()
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const updateDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                staggerChildren: 0.4,
                ease: "easeOut",
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15,
            },
        },
    };

    const iconContainerVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: 0.5,
            },
        },
    };

    const floatingAnimation = {
        y: [-8, 8],
        rotate: [-3, 3],
        transition: {
            y: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            },
            rotate: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            },
        },
    };

    const glowVariants = {
        initial: { scale: 0.9, opacity: 0 },
        animate: {
            scale: 1.1,
            opacity: [0.3, 0.15, 0.3],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        initialX:
            windowDimensions.width > 0
                ? Math.random() * windowDimensions.width
                : 0,
        initialY:
            windowDimensions.height > 0
                ? Math.random() * windowDimensions.height
                : 0,
        duration: 4 + Math.random() * 2,
        delay: Math.random() * 3,
    }));

    return (
        <section className="relative min-h-[90vh] bg-black overflow-hidden">
            <motion.div
                initial={false}
                animate={{
                    background: [
                        "radial-gradient(circle at 50% 50%, #000000 0%, #0A0A0A 100%)",
                        "radial-gradient(circle at 30% 70%, #000000 0%, #0A0A0A 100%)",
                        "radial-gradient(circle at 70% 30%, #000000 0%, #0A0A0A 100%)",
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="absolute inset-0"
            />

            {windowDimensions.width > 0 &&
                particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        initial={{
                            x: particle.initialX,
                            y: particle.initialY,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}

            <div className="container mx-auto px-4 py-20 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center text-center max-w-3xl mx-auto"
                >
                    <motion.div
                        variants={iconContainerVariants}
                        className="mb-16 relative"
                    >
                        <motion.div
                            variants={glowVariants}
                            initial="initial"
                            animate="animate"
                            className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
                        />

                        <motion.div
                            animate={floatingAnimation}
                            className="bg-gradient-to-br from-primary/30 to-primary/20 p-8 rounded-full backdrop-blur-sm relative"
                        >
                            <GraduationCap className="w-16 h-16 text-white" />
                            <motion.div
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    scale: [0.9, 1.1, 0.9],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                            />
                        </motion.div>

                        <motion.div
                            className="absolute -top-6 -right-6"
                            animate={floatingAnimation}
                            transition={{ delay: 0.3 }}
                        >
                            <Award className="w-10 h-10 text-white" />
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-6 -left-6"
                            animate={floatingAnimation}
                            transition={{ delay: 0.6 }}
                        >
                            <FileText className="w-10 h-10 text-white" />
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        variants={staggerItem}
                        className="text-5xl md:text-6xl font-bold mb-8 text-white relative tracking-tighter"
                        
                    >
                        Get Your Exam Mark Sheet
                        <motion.span
                            className="absolute md:-right-8 md:top-0 "
                            animate={{
                                rotate: [0, 15, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="md:text-xl text-gray-200 mb-16 leading-relaxed max-w-2xl text-wrap"
                    >
                        Access your academic achievements instantly. Our secure
                        platform allows you to view, download, and verify your
                        exam results with just a few clicks. Stay updated with
                        your educational progress anytime, anywhere.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-[70%] sm:w-auto"
                    >
                        <Button
                            className="group relative w-full sm:w-auto bg-white hover:bg-gray-100 text-black text-lg px-10 py-6 overflow-hidden transition-colors duration-300"
                            onClick={() => router.push("/results")}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
                                initial={false}
                                animate={{
                                    opacity: [0, 0.5, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <span className="relative z-10 font-medium">
                                Find Now
                            </span>
                            <motion.div
                                className="relative z-10 inline-flex items-center"
                                initial={false}
                                animate={{
                                    x: [0, 4, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Search className="ml-2 w-5 h-5 group-hover:rotate-6 transition-transform duration-300" />
                            </motion.div>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
