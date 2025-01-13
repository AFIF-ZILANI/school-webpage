"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GalleryForm } from "@/components/admin/gallery/GalleryForm";
import { GalleryGrid } from "@/components/admin/gallery/GalleryGrid";

export default function AdminGallery() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <Button onClick={() => setIsCreating(true)}>Add Image</Button>
      </div>

      {isCreating ? (
        <GalleryForm onCancel={() => setIsCreating(false)} />
      ) : (
        <GalleryGrid />
      )}
    </div>
  );
}