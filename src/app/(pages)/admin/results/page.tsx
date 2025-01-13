"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResultForm } from "@/components/admin/results/ResultForm";
import { ResultList } from "@/components/admin/results/ResultList";

export default function AdminResults() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Results</h1>
        <Button onClick={() => setIsCreating(true)}>Add Result</Button>
      </div>

      {isCreating ? (
        <ResultForm onCancel={() => setIsCreating(false)} />
      ) : (
        <ResultList />
      )}
    </div>
  );
}