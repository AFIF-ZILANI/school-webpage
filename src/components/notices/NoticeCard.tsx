"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Files } from "lucide-react";

interface NoticeCardProps {
    notice: {
        title: string;
        content: string;
        category: string;
        attachments: { public_id: string; url: string };
        createdAt: string;
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
                <div className="flex justify-between">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {notice.category}
                    </span>
                    {notice.attachments ? (
                        <span>
                            <Files className="w-5 h-5" />
                        </span>
                    ): null}
                </div>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{notice.content}</p>
            </CardContent>
        </Card>
    );
}
