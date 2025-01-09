"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Notice {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function NoticePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    fetch(`/api/notices/${params.id}`)
      .then((res) => res.json())
      .then(setNotice);
  }, [params.id]);

  if (!notice) return null;

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Notices
        </Button>

        <PageHeader
          title={notice.title}
          description={`Posted on ${formatDate(notice.createdAt)}`}
        />

        <Card>
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {notice.category}
                </span>
              </div>
              <div className="whitespace-pre-wrap">{notice.content}</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}