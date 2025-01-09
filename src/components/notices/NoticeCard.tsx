"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface NoticeCardProps {
  notice: {
    title: string;
    content: string;
    category: string;
    createdAt: string;
    author: {
      name: string;
    };
  };
}

export function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{notice.title}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {formatDate(notice.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Posted by {notice.author.name}
          </span>
          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
            {notice.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{notice.content}</p>
      </CardContent>
    </Card>
  );
}