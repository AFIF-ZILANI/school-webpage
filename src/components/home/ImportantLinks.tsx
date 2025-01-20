"use client";

import { motion } from "framer-motion";
import {
    ExternalLink,
    BookOpen,
    School,
    GraduationCap,
    Building2,
    BookCheck,
    Library,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { JSX } from "react";

interface Link {
    name: string;
    url: string;
    icon: JSX.Element;
    description: string;
}

const links: Link[] = [
    {
        name: "SHBR",
        url: "https://rajshahieducationboard.gov.bd",
        icon: <GraduationCap className="w-6 h-6" />,
        description: "Secondary & Higher Education Board Rajshahi",
    },
    {
        name: "NTRCA",
        url: "https://www.ntrca.gov.bd",
        icon: <GraduationCap className="w-6 h-6" />,
        description:
            "Non-Government Teachers' Registration and Certification Authority",
    },
    {
        name: "NCTB",
        url: "https://nctb.gov.bd",
        icon: <BookOpen className="w-6 h-6" />,
        description: "National Curriculum and Textbook Board",
    },
    {
        name: "Education Ministry",
        url: "http://www.moedu.gov.bd",
        icon: <Building2 className="w-6 h-6" />,
        description: "Ministry of Education, Government of Bangladesh",
    },
    {
        name: "EMIS",
        url: "http://emis.gov.bd",
        icon: <School className="w-6 h-6" />,
        description: "Education Management Information System",
    },
    {
        name: "Secondary & Higher Education Division",
        url: "https://shed.gov.bd",
        icon: <BookCheck className="w-6 h-6" />,
        description: "Directorate of Secondary and Higher Education",
    },
    {
        name: "HSP",
        url: "http://www.hsp.gov.bd",
        icon: <Library className="w-6 h-6" />,
        description: "Higher Secondary Program",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export function ImportantLinks() {
    return (
        <section className="py-16 px-4 bg-gradient-to-br from-background to-secondary/20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Important Educational Links
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Access essential educational resources and government
                        portals for students, teachers, and education
                        professionals.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {links.map((link) => (
                        <motion.div key={link.name} variants={item}>
                            <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                            {link.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-semibold text-lg">
                                                    {link.name}
                                                </h3>
                                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {link.description}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
