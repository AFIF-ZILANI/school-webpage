import mongoose, { Schema } from "mongoose";

interface IImage {
    public_url: string;
    private_id: string;
    tag: string
    title: string;
    description: string;
    date: Date;
}

const ImageSchema: Schema = new Schema<IImage>({
    public_url: { type: String, required: true },
    private_id: { type: String, required: true },
    title: { type: String, required: true },
    tag: {type: String, required: true, index: true},
    description: { type: String, required: true },
    date: { type: Date, required: true },
});

export const ImageModel = mongoose.models.Image || mongoose.model<IImage>("Image", ImageSchema);

