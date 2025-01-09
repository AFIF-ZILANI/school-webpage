"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/PageHeader";
import { NoticeCard } from "@/components/notices/NoticeCard";
import { CreateNoticeDialog } from "@/components/notices/CreateNoticeDialog";

export default function NoticesPage() {
  const session = {user:{ role: "teacher"}}
  // const { data: session } = useSession();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then(setNotices);
  }, []);

  return (
    <div className="container py-8 min-h-[90vh] flex flex-col items-center">
      <PageHeader
        title="Notice Board"
        description="Stay updated with the latest announcements and events"
      >
        {session?.user.role === "teacher" && <CreateNoticeDialog />}
      </PageHeader>

      <div className="grid gap-6">
        {notices.map((notice, index) => (
          <NoticeCard key={index} notice={notice} />
        ))}
      </div>
    </div>
  );
}