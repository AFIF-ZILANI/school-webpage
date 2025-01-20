"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { NoticeCard } from "@/components/notices/NoticeCard";
import { useGetData } from "@/lib/apiRequest";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";


export default function NoticesPage() {
    const [notices, setNotices] = useState([]);
    const { data, isLoading } = useGetData("/get-notices");
    useEffect(() => {
        if (data) {
            setNotices(data.data);
        }
    }, [data, isLoading]);

    return (
        <div className="container py-8 min-h-[90vh] flex flex-col items-center">
            <PageHeader
                title="Notice Board"
                description="Stay updated with the latest announcements and events"
            ></PageHeader>

            {isLoading ? (
                <Loader2 className="w-8 h-8 animate-spin"/>
            ) : notices.length ? (
                <div className="grid gap-6 md:w-[70%]">
                    {notices.map((notice, index) => (
                        <NoticeCard key={index} notice={notice} />
                    ))}
                </div>
            ) : (
                <Label>No notices are available now</Label>
            )}
        </div>
    );
}
