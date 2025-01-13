"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AboutForm() {
  const [formData, setFormData] = useState({
    story: "",
    mission: "",
    vision: "",
    values: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="story">Our Story</Label>
          <Textarea
            id="story"
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="mission">Our Mission</Label>
          <Textarea
            id="mission"
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="vision">Our Vision</Label>
          <Textarea
            id="vision"
            value={formData.vision}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="values">Core Values (one per line)</Label>
          <Textarea
            id="values"
            value={formData.values}
            onChange={(e) => setFormData({ ...formData, values: e.target.value })}
            rows={4}
            placeholder="Compassion&#10;Excellence&#10;Innovation&#10;Integrity"
          />
        </div>

        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </Card>
  );
}