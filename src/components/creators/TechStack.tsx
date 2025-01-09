"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", description: "React framework for production" },
  { name: "TypeScript", description: "Typed JavaScript at scale" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework" },
  { name: "Framer Motion", description: "Production-ready animations" },
  { name: "Shadcn/ui", description: "Beautifully designed components" },
  { name: "Lucide Icons", description: "Beautiful & consistent icons" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function TechStack() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Tech Stack</h2>
          <p className="text-muted-foreground">
            Built with modern technologies for optimal performance and user experience
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              className="p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
              <p className="text-muted-foreground">{tech.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}