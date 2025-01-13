"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Files } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/cloudinary/cloudinaryUpload";
import { useAddData } from "@/lib/apiRequest";
import { useToast } from "@/hooks/use-toast";

import { NoticeFormProps } from "@/types/requestExpectedTypes";

export function NoticeForm({ onCancel }: { onCancel: () => void }) {
    const [formData, setFormData] = useState<NoticeFormProps>({
        title: "",
        content: "",
        category: "NONE",
        file: {
            public_id: "",
            url: "",
        },
        isWithAttachment: false,
    });
    const [uploadedFile, setUploadedFile] = useState({
        public_id: "",
        url: "",
    });
    const { data, isError, isLoading, isSuccess, mutate } = useAddData(
        "/create-notice",
        "create-notice",
    );

    const { toast } = useToast();

    useEffect(() => {
        if (uploadedFile) {
            setFormData({
                ...formData,
                file: {
                    public_id: uploadedFile.public_id,
                    url: uploadedFile.url,
                },
            });
            setFormData({ ...formData, isWithAttachment: true });
        }
        if (isSuccess) {
            toast({
                title: "Success!",
                description: "Notice added successfully!",
                variant: "default",
            });
            onCancel();
        }
    }, [isSuccess, uploadedFile]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    };
    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={formData.category}
                        onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                            <SelectItem value="announcement">
                                Announcement
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                content: e.target.value,
                            })
                        }
                        required
                        rows={5}
                    />
                </div>
                <div>
                    <Label htmlFor="attachment">Attachment</Label>
                    <div className="flex justify-between pr-12 items-center">
                        <ImageUploader setUploadedImage={setUploadedFile} />
                        {uploadedFile && (
                            <>
                                <a
                                    href={uploadedFile.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Files className="w-10 h-10 cursor-pointer text-blue-600" />
                                </a>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Add Notice</Button>
                </div>
            </form>
        </Card>
    );
}
