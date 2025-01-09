"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="container py-8 flex flex-col items-center">
            <PageHeader
                title="Contact Us"
                description="Get in touch with us for any inquiries"
            />

            <div className="grid md:grid-cols-2 gap-12 md:gap-36">
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                value={formData.subject}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        subject: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        message: e.target.value,
                                    })
                                }
                                required
                                rows={5}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>info@raigonhigh.edu</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <span>+1 234 567 890</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>123 School Street, City, State</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Office Hours
                        </h3>
                        <div className="space-y-2">
                            <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                            <p>Saturday: 9:00 AM - 1:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
