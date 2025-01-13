"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreatorForm } from "@/components/admin/creators/CreatorForm";
import { CreatorList } from "@/components/admin/creators/CreatorList";

export default function AdminCreators() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Creators</h1>
        <Button onClick={() => setIsCreating(true)}>Add Creator</Button>
      </div>

      {isCreating ? (
        <CreatorForm onCancel={() => setIsCreating(false)} />
      ) : (
        <CreatorList />
      )}
    </div>
  );
}