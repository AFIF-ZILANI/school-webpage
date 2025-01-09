"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

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
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {images.map((image) => (
          <motion.div
            key={image.id}
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold">{image.title}</h3>
                <p className="text-white/80 text-sm">{image.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-muted-foreground">{selectedImage.description}</p>
              <p className="text-sm text-muted-foreground">{selectedImage.date}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}