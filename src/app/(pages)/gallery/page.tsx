"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

const images = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
    title: "Annual Sports Day",
    description: "Students participating in various sports activities",
    date: "2024-02-15",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "Science Exhibition",
    description: "Innovative projects by our young scientists",
    date: "2024-01-20",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
    title: "Cultural Festival",
    description: "Celebrating diversity through cultural performances",
    date: "2024-03-05",
  },
  // Add more images as needed
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <PageHeader
          title="School Gallery"
          description="Capturing memorable moments from our school events"
        />
        <GalleryGrid images={images} />
      </motion.div>
    </div>
  );
}