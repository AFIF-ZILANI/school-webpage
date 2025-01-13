"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";

export function GalleryGrid() {
  const images = []; // Fetch images from API

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <Card key={image.id} className="relative group">
          <div className="aspect-video relative">
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{image.title}</h3>
            <p className="text-sm text-muted-foreground">{image.date}</p>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="secondary" size="icon" className="mr-2">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}