"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TeacherForm } from "@/components/admin/teachers/TeacherForm";
import { TeacherList } from "@/components/admin/teachers/TeacherList";

export default function AdminTeachers() {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Teachers</h1>
                <Button onClick={() => setIsCreating(true)}>Add Teacher</Button>
            </div>

            {isCreating ? (
                <TeacherForm onCancel={() => setIsCreating(false)} />
            ) : (
                <TeacherList />
            )}
        </div>
    );
}
