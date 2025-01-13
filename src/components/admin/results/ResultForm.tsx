"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResultFormProps {
  onCancel: () => void;
}

export function ResultForm({ onCancel }: ResultFormProps) {
  const [formData, setFormData] = useState({
    studentId: "",
    exam: "",
    class: "",
    subjects: [{ name: "", marks: "", grade: "" }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onCancel();
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="studentId">Student ID</Label>
          <Input
            id="studentId"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="exam">Exam</Label>
          <Input
            id="exam"
            value={formData.exam}
            onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="class">Class</Label>
          <Select
            value={formData.class}
            onValueChange={(value) => setFormData({ ...formData, class: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(12)].map((_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  Class {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Result</Button>
        </div>
      </form>
    </Card>
  );
}