"use client";

import { motion } from "framer-motion";
import { AboutHero } from "@/components/about/AboutHero";
import { MissionVision } from "@/components/about/MissionVision";
import { Timeline } from "@/components/about/Timeline";
import { Values } from "@/components/about/Values";
import { staggerContainer, staggerItem } from "@/lib/animation-utils";

export default function AboutPage() {
    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="overflow-hidden"
        >
            <motion.div variants={staggerItem}>
                <AboutHero />
            </motion.div>
            <motion.div variants={staggerItem}>
                <MissionVision />
            </motion.div>
            <motion.div variants={staggerItem}>
                <Timeline />
            </motion.div>
            <motion.div variants={staggerItem} className="flex justify-center">
                <Values />
            </motion.div>
        </motion.div>
    );
}
