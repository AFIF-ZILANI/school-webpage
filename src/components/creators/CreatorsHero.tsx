"use client";

import { motion } from "framer-motion";

export function CreatorsHero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet the Creators</h1>
          <p className="px-4 text-xl text-muted-foreground">
            A passionate team of developers and designers who brought this project
            to life, combining creativity with cutting-edge technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
}