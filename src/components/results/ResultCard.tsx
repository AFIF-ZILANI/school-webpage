"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface ResultCardProps {
  result: {
    exam: string;
    class: string;
    year: number;
    subjects: Array<{
      name: string;
      marks: number;
      grade: string;
    }>;
    totalMarks: number;
    percentage: number;
    grade: string;
    createdAt: string;
  };
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {result.exam} - Class {result.class} ({result.year})
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Published on {formatDate(result.createdAt)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            {result.subjects.map((subject) => (
              <div
                key={subject.name}
                className="p-3 rounded-lg bg-secondary"
              >
                <p className="font-medium">{subject.name}</p>
                <p>Marks: {subject.marks}</p>
                <p>Grade: {subject.grade}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <p>Total Marks: {result.totalMarks}</p>
              <p>Percentage: {result.percentage}%</p>
            </div>
            <div className="text-2xl font-bold">
              Grade: {result.grade}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}