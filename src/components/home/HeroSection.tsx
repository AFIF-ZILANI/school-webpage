"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { slideUp, staggerContainer, staggerItem } from "@/lib/animation-utils";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background min-h-[80vh] flex items-center justify-center">
      <div className="container">
        <motion.div 
          className="max-w-2xl mx-auto text-center space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight"
            variants={staggerItem}
          >
            Welcome to Raigaon High School
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            variants={staggerItem}
          >
            Nurturing minds, building futures. Join us in our mission to provide
            excellence in education and character development.
          </motion.p>
          <motion.div 
            className="flex gap-4 justify-center"
            variants={staggerItem}
          >
            <Button asChild size="lg" className="hover:scale-105 transition">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="hover:scale-105 transition">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}