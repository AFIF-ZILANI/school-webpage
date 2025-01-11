// components/CloudinaryUpload.tsx
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

const CloudinaryUpload = () => {
    const [image, setImage] = useState<{
        url: string;
        public_id: string;
    } | null>(null);

    const handleUpload = () => {
        openUploadWidget({}, (error, result) => {
            if (result.event === "success") {
                const { secure_url, public_id } = result.info;
                setImage({ url: secure_url, public_id });
                // Post the image URL and public_id to your API to save it to MongoDB
                fetch("/api/upload", {
                    method: "POST",
                    body: JSON.stringify({ secure_url, public_id }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
        });
    };

    return (
        <div>
            <button onClick={handleUpload}>Upload Image</button>
            {image && <img src={image.url} alt="Uploaded Image" />}
        </div>
    );
};

export default CloudinaryUpload;
function openUploadWidget(arg0: {}, arg1: (error: any, result: any) => void) {
    throw new Error("Function not implemented.");
}
