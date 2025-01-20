"use client";

import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
    return (
        <header className="border-b bg-white w-screen">
            <div className="flex h-16 items-center justify-end md:pr-16">
                <div className=" flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
