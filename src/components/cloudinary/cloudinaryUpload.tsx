"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDeleteData } from "@/lib/apiRequest";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Files } from "lucide-react";

export function FileUploader({
    uploadedFile,
    setUploadedFile,
    preset,
    isEditing,
}: {
    uploadedFile: { public_id: string; url: string };
    setUploadedFile: Dispatch<
        SetStateAction<{
            public_id: string;
            url: string;
        }>
    >;
    isEditing?: boolean;
    preset: "teacher_con" | "file_con";
}) {
    const { toast } = useToast();
    const { isError, isSuccess, mutate, isLoading } =
        useDeleteData("/remove-file");
    const [fileUploadError, setFileUploadError] = useState("");

    const handleUpload = (result: any) => {
        if (result.event === "success") {
            setUploadedFile({
                public_id: result.info.public_id,
                url: result.info.secure_url,
            });
        }

        if (result.event !== "success") {
            setFileUploadError("");
            setUploadedFile({
                public_id: "",
                url: "",
            });
        }
    };

    function handelDeleteImage() {
        if (isEditing) {
            setUploadedFile({ public_id: "", url: "" });
            return;
        }
        if (uploadedFile.public_id) {
            mutate(uploadedFile.public_id);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setUploadedFile({ public_id: "", url: "" });
            toast({
                title: "Success!",
                description: "Image removed successfully!",
                variant: "default",
            });
        }

        if (isError) {
            toast({
                title: "Error!",
                description: "Can't remove Image!",
                variant: "destructive",
            });
        }
        if (uploadedFile.public_id) {
            console.log(uploadedFile);
        }
    }, [isError, isSuccess]);

    function ShowImage() {
        document.body.style.overflowY = "scroll";
        return (
            <div>
                {preset === "file_con" ? (
                    <div className="mt-3">
                        <Files className="w-20 h-20 cursor-pointer text-gray-800" />

                        <RxCross2
                            className={`w-6 h-6 relative left-[70px] bottom-[90px] bg-black text-white ${isLoading ? "animate-pulse" : ""} rounded-full p-1 cursor-pointer`}
                            onClick={() => {
                                if (!isLoading) handelDeleteImage();
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <Image
                            src={uploadedFile.url}
                            width={150}
                            height={150}
                            alt={`Uploaded Picture`}
                            className={`rounded-lg ${isLoading ? "blur-md transition duration-500 ease-in-out" : ""}`}
                        />
                        <RxCross2
                            className="w-6 h-6 relative left-[135px] bottom-[155px] bg-black text-white rounded-full p-1 cursor-pointer"
                            onClick={handelDeleteImage}
                        />
                    </>
                )}
            </div>
        );
    }

    return (
        <div>
            {!uploadedFile.public_id && !uploadedFile.url ? (
                <CldUploadWidget
                    uploadPreset={preset}
                    onSuccess={handleUpload}
                    options={{ multiple: false }}
                >
                    {({ open }) => (
                        <Button onClick={() => open()}>
                            {preset === "file_con"
                                ? "Upload File"
                                : "Upload Image"}
                        </Button>
                    )}
                </CldUploadWidget>
            ) : (
                <ShowImage />
            )}
            {fileUploadError && (
                <p className="mt-2 text-red-600 text-center">
                    {fileUploadError}
                </p>
            )}
        </div>
    );
}
