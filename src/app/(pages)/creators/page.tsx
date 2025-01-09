"use client";

import { motion } from "framer-motion";
import { CreatorsHero } from "@/components/creators/CreatorsHero";
import { TeamGrid } from "@/components/creators/TeamGrid";
import { TechStack } from "@/components/creators/TechStack";

export default function CreatorsPage() {
    return (
        <div>
            <CreatorsHero />
            <div className="flex justify-center">
                <div className="w-[90vw]">
                    <TeamGrid />
                </div>
            </div>
                <TechStack />

        </div>
    );
}
