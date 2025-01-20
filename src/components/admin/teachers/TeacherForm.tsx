"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { FileUploader } from "@/components/cloudinary/cloudinaryUpload";
import { useAddData } from "@/lib/apiRequest";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
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

export function TeacherForm({ onCancel }: TeacherFormProps) {
    const [YOEError, setYOEError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [formData, setFormData] = useState<ITeacher>({
        fullName: "",
        avatar: {
            public_id: "",
            url: "",
        },
        subject: "",
        yearsOfExperience: 0,
        position: "",
        id: "",
        email: "",
        phone: "",
    });

    const [uploadedImage, setUploadedImage] = useState(formData.avatar);

    const { toast } = useToast();

    const { mutate, error, isLoading, isError, isSuccess } =
        useAddData("/create-teacher");

    useEffect(() => {
        if (uploadedImage) {
            setFormData((prev) => ({ ...prev, avatar: uploadedImage }));
        }

        if (isSuccess) {
            toast({
                title: "Success!",
                description: "Teacher added successfully!",
                variant: "default",
            });
            onCancel();
        }
    }, [uploadedImage, isSuccess, toast, onCancel]);

    const validFormData =
        formData.fullName &&
        formData.position &&
        formData.avatar.public_id &&
        formData.avatar.url &&
        formData.subject &&
        formData.yearsOfExperience &&
        formData.id;

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
            setEmailError("");
            setPhoneError("");
            setYOEError("");
            mutate(formData);
        }
    };

    const numberStringSchema = z
        .string()
        .refine((val) => !isNaN(Number(val)), { message: "Must be a number" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const parseResult = numberStringSchema.safeParse(value);
        if (parseResult.success) {
            setYOEError("");
            const years = Number(parseResult.data);
            if (years < 1 || years > 50) {
                setYOEError("Enter a valid exprience year");
            }
            setFormData((prev) => ({ ...prev, yearsOfExperience: years }));
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
                        value={formData.fullName}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                            }))
                        }
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="porition">Position</Label>
                    <Select
                        value={formData.position}
                        onValueChange={(value) =>
                            setFormData((prev) => ({
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
                        value={formData.subject}
                        onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, subject: value }))
                        }
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Teacher'subject" />
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
                        value={formData.yearsOfExperience}
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
                    <Label htmlFor="id">Teacher Id</Label>
                    <Input
                        id="id"
                        value={formData.id}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                id: e.target.value,
                            }))
                        }
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center gap-3 pl-3">
                        <span>+88</span>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData((prev) => ({
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
                        value={formData.email}
                        type="email"
                        onChange={(e) =>
                            setFormData((prev) => ({
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
                        uploadedFile={uploadedImage}
                        setUploadedFile={setUploadedImage}
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
                                Adding...
                            </>
                        ) : (
                            <>Add Teacher</>
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
