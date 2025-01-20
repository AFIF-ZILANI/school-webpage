"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FileUploader } from "@/components/cloudinary/cloudinaryUpload";
import { useAddData } from "@/lib/apiRequest";
import { useToast } from "@/hooks/use-toast";

import { NoticeFormProps } from "@/types/requestExpectedTypes";
import { Loader2 } from "lucide-react";

export function NoticeForm({
    onCancel,
    formData,
    setFormData,
}: {
    onCancel: () => void;
    formData: NoticeFormProps;
    setFormData: Dispatch<SetStateAction<NoticeFormProps>>;
}) {
    const [uploadedFile, setUploadedFile] = useState({
        public_id: "",
        url: "",
    });
    const { isError, isLoading, isSuccess, mutate } =
        useAddData("/create-notice");

    const { toast } = useToast();

    const validFormData =
        formData.title && formData.category && formData.content;

    useEffect(() => {
        if (uploadedFile.public_id) {
            setFormData((prevData) => ({
                ...prevData,
                attachment: uploadedFile,
                isWithAttachment: true,
            }));
        }
    }, [uploadedFile]);

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Success!",
                description: "Notice added successfully!",
                variant: "default",
            });
            onCancel();
        }
        if (isError) {
            toast({
                title: "Failed!",
                description: "Notice Creation Failed, try again!",
                variant: "destructive",
            });
        }
    }, [isSuccess, isError, toast]);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        mutate(formData);
    }

    return (
        <Card className="p-6">
            <div className="space-y-4">
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
                            <SelectItem value="ACADEMIC">Academic</SelectItem>
                            <SelectItem value="EVENT">Event</SelectItem>
                            <SelectItem value="ANNOUNCEMENT">
                                Announcement
                            </SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
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
                <div className="space-y-3">
                    <Label htmlFor="attachment">Attachment</Label>
                    <FileUploader
                        setUploadedFile={setUploadedFile}
                        uploadedFile={uploadedFile}
                        preset="file_con"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading || !validFormData}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            <>Add Notice</>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
