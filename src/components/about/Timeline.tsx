"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animation-utils";

const timelineEvents = [
  {
    year: "1946",
    title: "Foundation",
    description: "Raigaon High School was established with a vision to provide quality education."
  },
  {
    year: "2020",
    title: "Campus Expansion",
    description: "Added new academic buildings and modern facilities."
  },
  {
    year: "2021",
    title: "Digital Revolution",
    description: "Introduced computer labs and digital learning resources."
  },

  {
    year: "2021",
    title: "Golden Jubilee",
    description: "Celebrated 75 years of academic excellence."
  }
];

export function Timeline() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Journey
        </motion.h2>
        
        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent" />
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div 
                className={`w-1/2 ${
                  index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"
                }`}
              >
                <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <span className="text-2xl font-bold text-primary">{event.year}</span>
                  <h3 className="text-xl font-semibold mt-2">{event.title}</h3>
                  <p className="text-muted-foreground mt-2">{event.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}