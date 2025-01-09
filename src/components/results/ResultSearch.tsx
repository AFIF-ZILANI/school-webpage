"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResultSearchProps {
  onSearch: (studentId: string) => void;
}

export function ResultSearch({ onSearch }: ResultSearchProps) {
  const [studentId, setStudentId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(studentId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
      <div>
        <Label htmlFor="studentId">Student ID</Label>
        <Input
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter your student ID"
          required
          className="w-[300px] md:w-[600px]"
        />
      </div>
      <Button type="submit">View Results</Button>
    </form>
  );
}