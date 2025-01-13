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

export interface TeacherFormData {
    fullName: string;
    subjects: string;
    position: string;
    avatar: {
        public_id: string;
        url: string;
    };
    yearsOfExprience: string;
    id: string;
}

interface TeacherFormProps {
    onCancel: () => void;
}

export function TeacherForm({ onCancel }: TeacherFormProps) {
    const [error, setError] = useState("");
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
        subjects: "",
        yearsOfExprience: "",
        position: "",
        id: "",
    });

    const { mutate, error: submitError, data, variables, isLoading } = useAddData(
        "/create-teacher",
        "create-teacher",
    );

    useEffect(() => {
        console.log(submitError);
        console.log(data);
        console.log(variables);
        console.log(isLoading);
        console.log(uploadedImage);
    }, [error, data, variables, isLoading, uploadedImage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);

        onCancel();
    };

    const numberStringSchema = z
        .string()
        .refine((val) => !isNaN(Number(val)), { message: "Must be a number" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // const parseResult = numberStringSchema.safeParse(value);
        // if (parseResult.success) {
        //     setError("");
        //     const years = Number(parseResult.data);
        //     if (years < 1 || years > 50) {
        //         setError("Enter a valid exprience year");
        //     }
        //     setFormData({ ...formData, yearsOfExprience: years });
        // } else {
        //     setError(parseResult.error.errors[0].message);
        // }
        setFormData({ ...formData, yearsOfExprience: value });
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
                    <Label htmlFor="subjects">Subjects (comma separated)</Label>
                    <Input
                        id="subjects"
                        value={formData.subjects}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                subjects: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="yearsOfExprience">
                        Years Of Experience
                    </Label>
                    <Input
                        id="yearsOfExprience"
                        value={formData.yearsOfExprience}
                        onChange={handleChange}
                        required
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
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
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Label htmlFor="avatar">Picture</Label>
                    <div className="flex justify-between pr-14">
                        <ImageUploader setUploadedImage={setUploadedImage} />
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
                    <Button type="submit">Save Teacher</Button>
                </div>
            </form>
        </Card>
    );
}
