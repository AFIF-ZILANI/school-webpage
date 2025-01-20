"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, Instagram, Twitter } from "lucide-react";
import Tauhid from "@/images/Tauhid.jpg";
import AFIF from "@/images/hero.jpg";
import { Separator } from "../ui/separator";

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
        name: "Tauhid Rana",
        role: "Assistant Devoloper & Data Manager",
        about: "Co-Founder of ZeroD",
        from: "Native student",
        image: Tauhid,
        github: "https://github.com/Tauhidrana",
        linkedin: "#",
        email: "tauhidrana00@gmail.com",
        instagram: "https://instagram.com/tauhid.rana.52",
        twitter: "#",
    },
    {
        name: "AFIF ZILANI",
        role: "Lead Devoloper",
        about: "Co-Founder of ZeroD",
        from: "Iqra International School",
        image: AFIF,
        github: "https://github.com/AFIF-ZILANI",
        linkedin: "#",
        email: "afifzilani4566@gmail.com",
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
                    className="grid md:grid-cols-2 gap-40"
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
                                    className="object-cover"
                                />
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
                                <p className="text-muted-foreground">
                                    {member.from}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Separator className="w-[90%] h-[1.5px]" />
                            </div>
                            <div className="flex justify-center space-x-7 pt-4 pb-5">
                                <a
                                    href={member.github}
                                    className="hover:text-primary"
                                >
                                    <Github className="h-6 w-6" />
                                </a>
                                <a
                                    href={member.linkedin}
                                    className="hover:text-primary"
                                >
                                    <Linkedin className="h-6 w-6" />
                                </a>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="hover:text-primary"
                                >
                                    <Mail className="h-6 w-6" />
                                </a>
                                <a
                                    href={`mailto:${member.instagram}`}
                                    className="hover:text-primary"
                                >
                                    <Instagram className="h-6 w-6" />
                                </a>
                                <a
                                    href={`mailto:${member.twitter}`}
                                    className="hover:text-primary"
                                >
                                    <Twitter className="h-6 w-6" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
