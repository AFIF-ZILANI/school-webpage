"use client";

import { AboutForm } from "@/components/admin/about/AboutForm";

export default function AdminAbout() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage About Page</h1>
      <AboutForm />
    </div>
  );
}