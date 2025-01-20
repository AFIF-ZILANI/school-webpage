"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    GraduationCap,
    Users,
    Image,
    Bell,
    Settings,
    User,
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Notices",
        href: "/admin/notices",
        icon: FileText,
    },
    {
        title: "Results",
        href: "/admin/results",
        icon: GraduationCap,
    },
    {
        title: "Teachers",
        href: "/admin/teachers",
        icon: Users,
    },
    {
        title: "Gallery",
        href: "/admin/gallery",
        icon: Image,
    },
    {
        title: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
    {
        title: "Profile",
        href: "/admin/profile",
        icon: User,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white border-r min-h-screen">
            <div className="p-6">
                <h2 className="text-lg font-semibold">Admin Panel</h2>
            </div>
            <nav className="space-y-1 px-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-gray-50",
                            )}
                        >
                            <Icon className="h-5 w-5 mr-3" />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
