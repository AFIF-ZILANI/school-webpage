"use client";

import { motion } from "framer-motion";
import { Laptop, BookOpen, Users, Trophy } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Quality Education",
      description: "Comprehensive curriculum designed for academic excellence",
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Modern Facilities",
      description: "State-of-the-art infrastructure and learning resources",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Faculty",
      description: "Experienced teachers dedicated to student success",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Extra-curricular",
      description: "Diverse activities for holistic development",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Choose Raigon High School?
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-lg bg-card border text-center hover:shadow-lg transition-shadow"
              variants={item}
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}