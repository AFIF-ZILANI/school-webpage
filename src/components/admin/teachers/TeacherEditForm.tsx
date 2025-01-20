"use client";

import {useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { FileUploader } from "@/components/cloudinary/cloudinaryUpload";
import { useUpdateData } from "@/lib/apiRequest";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { UpdateTeacherExpectedDataType } from "@/types/requestExpectedTypes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ITeacher } from "@/models/Teacher";
import {
    validateBangladeshiPhone,
    validateEmail,
} from "@/lib/validation-utils";

interface TeacherFormProps {
    onCancel: () => void;
    formData: ITeacher;
}

const positionArray = [
    "Headmaster",
    "Assistant Headmaster",
    "Teacher",
    "Assistant Teacher",
    "Librarian",
    "Stafe",
];

const subjectArray = [
    "Bangla",
    "English",
    "Science",
    "Physics",
    "Boilogy",
    "Chemistry",
    "General Math",
    "Higher Math",
    "Business Studies",
    "Library & Information Science",
    "Hidu Religion & Moral Education",
    "Islam & Moral Education",
    "Cultural Science",
    "Physical Education",
];

export function TeacherEditForm({
    onCancel,
    formData,
}: TeacherFormProps) {
    const [YOEError, setYOEError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [editUploadedImage, setEditUploadedImage] = useState(formData.avatar);
    const [editFormData, setEditFormData] = useState(formData);

    const { toast } = useToast();

    const { error, isLoading, isError, isSuccess, mutate } =
        useUpdateData("/update-teacher");

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Success!",
                description: "Teacher updated successfully!",
                variant: "default",
            });
            onCancel();
        }
        if (isError) {
            toast({
                title: "Faild!",
                description: "Invalid Teacher data",
                variant: "destructive",
            });
        }
    }, [isSuccess, isError, toast, onCancel]);

    const validFormData =
        formData.fullName &&
        formData.position &&
        formData.avatar.public_id &&
        formData.avatar.url &&
        formData.subject &&
        formData.yearsOfExperience &&
        formData.phone;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validFormData) {
            if (formData.email && !validateEmail(formData.email)) {
                setEmailError("Invalid Email");
                return;
            }

            if (!validateBangladeshiPhone(formData.phone)) {
                setPhoneError("Invalid Phone Number");
                return;
            }

            const updateDataObject: UpdateTeacherExpectedDataType = {
                _id: "",
                fullName: {
                    isUpdating: false,
                    data: "",
                },
                position: {
                    isUpdating: false,
                    data: "",
                },
                subject: {
                    isUpdating: false,
                    data: "",
                },
                yearsOfExperience: {
                    isUpdating: false,
                    data: 0,
                },
                email: {
                    isUpdating: false,
                    data: "",
                },
                phone: {
                    isUpdating: false,
                    data: "",
                },
                avatar: {
                    isUpdating: false,
                    data: {
                        public_id: "",
                        url: "",
                    },
                },
            };

            if (editFormData.fullName !== formData.fullName) {
                updateDataObject.fullName.isUpdating = true;
                updateDataObject.fullName.data = editFormData.fullName;
            }
            if (editFormData.position !== formData.position) {
                updateDataObject.position.isUpdating = true;
                updateDataObject.position.data = editFormData.position;
            }
            if (editFormData.subject !== formData.subject) {
                updateDataObject.subject.isUpdating = true;
                updateDataObject.subject.data = editFormData.subject;
            }
            if (editFormData.yearsOfExperience !== formData.yearsOfExperience) {
                updateDataObject.yearsOfExperience.isUpdating = true;
                updateDataObject.yearsOfExperience.data =
                    editFormData.yearsOfExperience;
            }
            if (editFormData.phone !== formData.phone) {
                updateDataObject.phone.isUpdating = true;
                updateDataObject.phone.data = editFormData.phone;
            }
            if (editFormData.email !== formData.email) {
                updateDataObject.email.isUpdating = true;
                updateDataObject.email.data = editFormData.email ?? null;
            }
            if (
                editFormData.avatar.public_id !== formData.avatar.public_id ||
                editFormData.avatar.url !== formData.avatar.url
            ) {
                updateDataObject.avatar.isUpdating = true;
                updateDataObject.avatar.data.public_id =
                    editFormData.avatar.public_id;
                updateDataObject.avatar.data.url = editFormData.avatar.url;
            }

            if (!editUploadedImage.public_id || !editUploadedImage.url) {
                toast({
                    title: "Avatar is required!",
                    description: "Please selecet an avatar  for teacher",
                });
                return;
            }

            updateDataObject.avatar.data = editUploadedImage;

            setEmailError("");
            setPhoneError("");
            setYOEError("");
            updateDataObject._id = formData._id;

            if (
                updateDataObject._id &&
                (updateDataObject.fullName.isUpdating ||
                    updateDataObject.email.isUpdating ||
                    updateDataObject.avatar.isUpdating ||
                    updateDataObject.phone.isUpdating ||
                    updateDataObject.position.isUpdating ||
                    updateDataObject.subject.isUpdating ||
                    updateDataObject.yearsOfExperience.isUpdating)
            ) {
                mutate(updateDataObject);
            } else {
                toast({
                    title: "Invalid Action!",
                    description: "changes needed to update Teacher!",
                    variant: "destructive",
                });
            }
        }
    };

    const numberStringSchema = z
        .string()
        .refine((val) => !isNaN(Number(val)), { message: "Must be a number" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const parseResult = numberStringSchema.safeParse(value);
        if (parseResult.success) {
            const years = parseInt(value, 10);
            if (years >= 0) {
                setYOEError("");
                setEditFormData((prev) => ({
                    ...prev,
                    yearsOfExperience: years,
                }));
            } else {
                setYOEError("Enter a valid experience year");
            }
        } else {
            setYOEError(parseResult.error.errors[0].message);
        }
    };

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        value={
                            editFormData.fullName ? editFormData.fullName : ""
                        }
                        onChange={(e) =>
                            setEditFormData((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                            }))
                        }
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="position">Position</Label>
                    <Select
                        value={editFormData.position}
                        onValueChange={(value) =>
                            setEditFormData((prev) => ({
                                ...prev,
                                position: value,
                            }))
                        }
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Teacher's Position" />
                        </SelectTrigger>
                        <SelectContent>
                            {positionArray.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                        value={editFormData.subject}
                        onValueChange={(value) =>
                            setEditFormData((prev) => ({
                                ...prev,
                                subject: value,
                            }))
                        }
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Teacher's Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {subjectArray.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="yearsOfExperience">
                        Years Of Experience
                    </Label>
                    <Input
                        id="yearsOfExperience"
                        value={
                            editFormData.yearsOfExperience
                                ? editFormData.yearsOfExperience
                                : 0
                        }
                        onChange={handleChange}
                        required
                    />
                    {YOEError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                        >
                            <p className="text-red-600 text-center font-medium">
                                {YOEError}
                            </p>
                        </motion.div>
                    )}
                </div>
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center gap-3 pl-3">
                        <span>+88</span>
                        <Input
                            id="phone"
                            value={editFormData.phone ? editFormData.phone : ""}
                            onChange={(e) =>
                                setEditFormData((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    {phoneError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                        >
                            <p className="text-red-600 text-center font-medium">
                                {phoneError}
                            </p>
                        </motion.div>
                    )}
                </div>
                <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                        id="email"
                        value={editFormData.email ? editFormData.email : ""}
                        type="email"
                        onChange={(e) =>
                            setEditFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                    {emailError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                        >
                            <p className="text-red-600 text-center font-medium">
                                {emailError}
                            </p>
                        </motion.div>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    <Label htmlFor="avatar">Picture</Label>
                    <FileUploader
                        preset="teacher_con"
                        uploadedFile={
                            editUploadedImage.url && editUploadedImage.public_id
                                ? editUploadedImage
                                : { public_id: "", url: "" }
                        }
                        isEditing={true}
                        setUploadedFile={setEditUploadedImage}
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading || !validFormData}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>Update Teacher</>
                        )}
                    </Button>
                </div>
            </form>
            {isError && error instanceof AxiosError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                    <p className="text-red-600 text-center font-medium">
                        {error.response?.status === 500
                            ? error.message
                            : error.response?.status === 404
                              ? error.message
                              : "Invalid Data, Please Try Again!"}
                    </p>
                </motion.div>
            )}
        </Card>
    );
}
