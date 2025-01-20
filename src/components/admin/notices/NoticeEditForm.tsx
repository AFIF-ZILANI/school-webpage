"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
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
import { useUpdateData } from "@/lib/apiRequest";
import { useToast } from "@/hooks/use-toast";

import {
    NoticeFormProps,
    UpdateNoticeExpectedDataType,
} from "@/types/requestExpectedTypes";
import { Loader2 } from "lucide-react";

export function NoticeEditForm({
    onCancel,
    formData,
    setFormData,
}: {
    onCancel: () => void;
    formData: NoticeFormProps;
    setFormData: Dispatch<SetStateAction<NoticeFormProps>>;
}) {
    const [editFormData, setEditFormData] = useState(formData);
    const [editUploadedFile, setEditUploadedFile] = useState(
        formData.attachment,
    );
    const { isError, isLoading, isSuccess, mutate } =
        useUpdateData("/update-notice");

    const { toast } = useToast();

    const validFormData =
        formData.title && formData.category && formData.content;

    useEffect(() => {
        if (
            editUploadedFile &&
            editUploadedFile.public_id &&
            editUploadedFile.url
        ) {
            setEditFormData((prev) => ({
                ...prev,
                attachment: editUploadedFile,
            }));
        }
    }, [editUploadedFile, onCancel, toast]);
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Success!",
                description: "Notice updated successfully!",
                variant: "default",
            });
            onCancel();
        }
        if (isError) {
            toast({
                title: "Failed!",
                description: "Notice updating failed, try again!",
                variant: "destructive",
            });
        }
    }, [isSuccess, isError, onCancel, toast]);

    const updateObject: UpdateNoticeExpectedDataType = {
        title: {
            isUpdating: false,
            data: "",
        },
        category: {
            isUpdating: false,
            data: "",
        },
        content: {
            isUpdating: false,
            data: "",
        },
        attachment: {
            isUpdating: false,
            data: {
                public_id: "",
                url: "",
            },
        },
        _id: "",
        status: {
            isUpdating: false,
            data: "",
        },
    };
    function handleSubmit() {
        if (editFormData.title !== formData.title) {
            updateObject.title.isUpdating = true;
            updateObject.title.data = editFormData.title;
        }
        if (editFormData.category !== formData.category) {
            updateObject.category.isUpdating = true;
            updateObject.category.data = editFormData.category;
        }
        if (editFormData.content !== formData.content) {
            updateObject.content.isUpdating = true;
            updateObject.content.data = editFormData.content;
        }
        if (editFormData.status !== formData.status) {
            updateObject.status.isUpdating = true;
            updateObject.status.data = editFormData.status;
        }
        if (
            (editFormData.attachment.url &&
                editFormData.attachment.public_id) !==
            (formData.attachment.url && formData.attachment.public_id)
        ) {
            updateObject.attachment.isUpdating = true;
            updateObject.attachment.data = editFormData.attachment;
        }

        updateObject._id = formData._id;
        if (
            updateObject._id &&
            (updateObject.attachment.isUpdating ||
                updateObject.category.isUpdating ||
                updateObject.content.isUpdating ||
                updateObject.status.isUpdating ||
                updateObject.title.isUpdating)
        ) {
            console.log(updateObject);
            mutate(updateObject);
        } else {
            toast({
                title: "Invalid Action!",
                description: "changes needed to update Notice!",
                variant: "destructive",
            });
        }
    }

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={editFormData.title ? editFormData.title : ""}
                        onChange={(e) =>
                            setEditFormData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={editFormData.category}
                        onValueChange={(value) =>
                            setEditFormData((prev) => ({
                                ...prev,
                                category: value,
                            }))
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
                        value={editFormData.content ? editFormData.content : ""}
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
                        setUploadedFile={setEditUploadedFile}
                        uploadedFile={
                            editUploadedFile.public_id && editUploadedFile.url
                                ? editUploadedFile
                                : { public_id: "", url: "" }
                        }
                        preset="file_con"
                        isEditing={true}
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
                                Updating...
                            </>
                        ) : (
                            <>Update Notice</>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
