"use client";

import { motion } from "framer-motion";
import { Heart, Users, Target, Book } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animation-utils";

const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Compassion",
    description: "Fostering empathy and understanding in our community"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Collaboration",
    description: "Working together to achieve common goals"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Excellence",
    description: "Striving for the highest standards in everything we do"
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Learning",
    description: "Promoting lifelong learning and curiosity"
  }
];

export function Values() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Core Values
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={staggerItem}
              className="group"
            >
              <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-2">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}