"use client";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { Button } from "../ui/button";

export function ImageUploader({
    uploadedImage,
    setUploadedImage,
}: {
    uploadedImage?: { public_id: ""; url: "" };
    setUploadedImage: (image: { public_id: string; url: string }) => void;
}) {
    const handleUpload = (result: any) => {
        setUploadedImage({
            public_id: result.info.public_id,
            url: result.info.secure_url,
        });
    };

    return (
            <div className=" bg-primary px-3 py-2 text-white rounded-lg">
                <CldUploadButton
                uploadPreset="teacher_con"
                onSuccess={handleUpload}
            />
            </div>
    );
}
