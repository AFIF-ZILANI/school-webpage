"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NoticeForm } from "@/components/admin/notices/NoticeForm";
import { NoticeList } from "@/components/admin/notices/NoticeList";
import { NoticeEditForm } from "@/components/admin/notices/NoticeEditForm";
import { NoticeFormProps } from "@/types/requestExpectedTypes";

export default function AdminNotices() {
    const [status, setStatus] = useState<"CREATING" | "UPDATING" | null>(null);
    const [formData, setFormData] = useState<NoticeFormProps>({
        _id: "",
        title: "",
        content: "",
        category: "",
        attachment: {
            public_id: "",
            url: "",
        },
        isWithAttachment: false,
        status: "",
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Notices</h1>
                <Button onClick={() => setStatus("CREATING")}>
                    Create Notice
                </Button>
            </div>

            {status === "CREATING" ? (
                <NoticeForm
                    onCancel={() => setStatus(null)}
                    formData={formData}
                    setFormData={setFormData}
                />
            ) : status === "UPDATING" ? (
                <NoticeEditForm
                    onCancel={() => setStatus(null)}
                    formData={formData}
                    setFormData={setFormData}
                />
            ) : (
                <NoticeList setFormData={setFormData} setStatus={setStatus}/>
            )}
        </div>
    );
}
