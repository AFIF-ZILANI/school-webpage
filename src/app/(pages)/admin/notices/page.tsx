"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NoticeForm } from "@/components/admin/notices/NoticeForm";
import { NoticeList } from "@/components/admin/notices/NoticeList";

export default function AdminNotices() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Notices</h1>
        <Button onClick={() => setIsCreating(true)}>Create Notice</Button>
      </div>

      {isCreating ? (
        <NoticeForm onCancel={() => setIsCreating(false)} />
      ) : (
        <NoticeList />
      )}
    </div>
  );
}