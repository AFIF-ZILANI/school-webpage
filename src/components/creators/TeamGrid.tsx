"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, Instagram, Twitter } from "lucide-react";
import Tauhid from "@/images/Tauhid.jpg";
import AFIF from "@/images/hero.jpg";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const team = [
    {
        name: "AFIF ZILANI",
        role: "Lead Devoloper",
        about: "Co-Founder of ZeroD",
        image: AFIF,
        github: "https://github.com/AFIF-ZILANI",
        linkedin: "#",
        email: "afifzilani4566@gmail.com",
        instagram: "https://instagram.com/afif_zilani",
        twitter: "https://x.com/afif_zilani",
    },
    {
        name: "Tauhid Rana",
        role: "Assistant Devoloper & Data Manager",
        about: "Co-Founder of ZeroD",
        image: Tauhid,
        github: "#",
        linkedin: "#",
        email: "Tauhidrana00@gmail.com",
        instagram: "https://instagram.com/afif_zilani",
        twitter: "https://x.com/afif_zilani",
    },
    // Add more team members as needed
];

export function TeamGrid() {
    return (
        <section className="py-24">
            <div className="container">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {team.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={item}
                            className="group relative overflow-hidden rounded-lg bg-card"
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex justify-center space-x-7  pt-8 pb-4 bg-black">
                                    <a
                                        href={member.github}
                                        className="text-white hover:text-primary"
                                    >
                                        <Github className="h-6 w-6" />
                                    </a>
                                    <a
                                        href={member.linkedin}
                                        className="text-white hover:text-primary"
                                    >
                                        <Linkedin className="h-6 w-6" />
                                    </a>
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="text-white hover:text-primary"
                                    >
                                        <Mail className="h-6 w-6" />
                                    </a>
                                    <a
                                        href={`mailto:${member.instagram}`}
                                        className="text-white hover:text-primary"
                                    >
                                        <Instagram className="h-6 w-6" />
                                    </a>
                                    <a
                                        href={`mailto:${member.twitter}`}
                                        className="text-white hover:text-primary"
                                    >
                                        <Twitter className="h-6 w-6" />
                                    </a>
                                </div>
                            <div className="p-6">
                                
                                <h3 className="text-xl font-semibold">
                                    {member.name}
                                </h3>
                                <p className="text-muted-foreground">
                                    {member.role}
                                </p>
                                <p className="text-muted-foreground">
                                    {member.about}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
