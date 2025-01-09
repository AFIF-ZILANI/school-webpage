"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface Notice {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function NoticePreview() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch("/api/notices?limit=3")
      .then((res) => res.json())
      .then(setNotices);
  }, []);

  return (
    <motion.div 
      className="grid gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {notices.map((notice) => (
        <motion.div key={notice._id} variants={item}>
          <Link href={`/notices/${notice._id}`}>
            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{notice.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(notice.createdAt)}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                  {notice.category}
                </span>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-muted-foreground">
                  {notice.content}
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}