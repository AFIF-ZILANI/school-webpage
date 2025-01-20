"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useGetData } from "@/lib/apiRequest";
import { INotice } from "@/models/Notice";
import { Label } from "@radix-ui/react-label";
import { Files } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
};

export function NoticePreview() {
    const { data, isLoading } = useGetData("/get-notices?limit=3");

    return !isLoading ? (
        <motion.div
            className="grid gap-6"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {data.data.map((notice: INotice) => (
                <motion.div key={notice._id} variants={item}>
                    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">
                                    {notice.title}
                                </CardTitle>
                                <span className="text-sm text-muted-foreground">
                                    {formatDate(notice.createdAt)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                                    {notice.category}
                                </span>
                                {notice.attachment ? (
                                    <span>
                                        <Files className="w-5 h-5" />
                                    </span>
                                ) : null}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="line-clamp-2 text-muted-foreground">
                                {notice.content}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    ) : (
        <Label>Loading...</Label>
    );
}
