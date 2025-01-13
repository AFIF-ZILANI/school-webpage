"use client";

import { formatDate } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "notice",
    title: "New Academic Calendar",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    type: "result",
    title: "Final Exam Results Published",
    date: new Date().toISOString(),
  },
  {
    id: 3,
    type: "gallery",
    title: "Sports Day Photos Added",
    date: new Date().toISOString(),
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between py-2"
        >
          <div>
            <p className="font-medium">{activity.title}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(activity.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}