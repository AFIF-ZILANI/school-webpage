"use client";

import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100  flex">
            <Sidebar />
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
