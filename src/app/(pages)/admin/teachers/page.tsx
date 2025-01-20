"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    TeacherForm,
} from "@/components/admin/teachers/TeacherForm";
import { TeacherList } from "@/components/admin/teachers/TeacherList";
import { TeacherEditForm } from "@/components/admin/teachers/TeacherEditForm";
import { ITeacher } from "@/models/Teacher";

export default function AdminTeachers() {
    const [status, setStatus] = useState<"CREATING" | "EDITING" | null>(null);
    const [formData, setFormData] = useState<ITeacher>({
        fullName: "",
        avatar: {
            public_id: "",
            url: "",
        },
        subject: "",
        yearsOfExperience: 0,
        position: "",
        id: "",
        email: "",
        phone: ""
    });
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Teachers</h1>
                <Button onClick={() => setStatus("CREATING")}>
                    Add Teacher
                </Button>
            </div>

            {status === "CREATING" ? (
                <TeacherForm onCancel={() => setStatus(null)} />
            ) : status === "EDITING" ? (
                <TeacherEditForm
                    setFormData={setFormData}
                    formData={formData}
                    onCancel={() => setStatus(null)}
                />
            ) : (
                <TeacherList setFormData={setFormData} setStatus={setStatus} />
            )}
        </div>
    );
}
