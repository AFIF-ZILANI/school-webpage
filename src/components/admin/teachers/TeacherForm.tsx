"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { ImageUploader } from "@/components/cloudinary/cloudinaryUpload";
import Image from "next/image";
import { useAddData } from "@/lib/apiRequest";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export interface TeacherFormData {
    fullName: string;
    subject: string;
    position: string;
    avatar: {
        public_id: string;
        url: string;
    };
    yearsOfExperience: number;
    id: string;
}

interface TeacherFormProps {
    onCancel: () => void;
}

export function TeacherForm({ onCancel }: TeacherFormProps) {
    const [YOEError, setYOEError] = useState("");
    const [uploadedImage, setUploadedImage] = useState({
        public_id: "",
        url: "",
    });
    const [formData, setFormData] = useState<TeacherFormData>({
        fullName: "",
        avatar: {
            public_id: "",
            url: "",
        },
        subject: "",
        yearsOfExperience: 0,
        position: "",
        id: "",
    });

    const { toast } = useToast();
    const { mutate, error, isLoading, isError, isSuccess, variables, data } =
        useAddData("/create-teacher", "create-teacher");

    useEffect(() => {
        // console.log(error);
        // console.log(data);
        // console.log(variables);
        // console.log(isLoading);
        // console.log(uploadedImage);

        if (uploadedImage) {
            setFormData({ ...formData, avatar: uploadedImage });
        }

        if (isSuccess) {
            toast({
                title: "Success!",
                description: "Teacher added successfully!",
                variant: "default",
            });
            onCancel();
        }
    }, [YOEError, uploadedImage, isSuccess]);

    const validFormData =
        formData.fullName &&
        formData.position &&
        formData.avatar &&
        formData.subject &&
        formData.yearsOfExperience &&
        formData.id;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadedImage.public_id || !uploadedImage.url) {
            setYOEError("Please Select a Picture");
        }
        mutate(formData);
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
            setFormData({ ...formData, yearsOfExperience: years });
        } else {
            setYOEError(parseResult.error.errors[0].message);
        }
        // setFormData({ ...formData, yearsOfExprience: value });
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
                            setFormData({
                                ...formData,
                                fullName: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="porition">Position</Label>
                    <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                position: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <Label htmlFor="subject">Subjects</Label>
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
                    <Label htmlFor="id">Teacher Id (optional)</Label>
                    <Input
                        id="id"
                        value={formData.id}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                id: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="">
                    <div className="flex justify-between pr-14 items-center">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="avatar">Picture</Label>
                            <ImageUploader
                                setUploadedImage={setUploadedImage}
                            />
                        </div>
                        {uploadedImage.url && uploadedImage.public_id ? (
                            <Image
                                src={uploadedImage.url}
                                width={150}
                                height={150}
                                alt={`Picture of ${formData.fullName} `}
                                className="rounded-lg"
                            />
                        ) : null}
                    </div>
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
