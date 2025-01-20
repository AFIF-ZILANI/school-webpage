import mongoose from "mongoose";

export interface INotice {
    _id: string;
    title: string;
    content: string;
    category: "ACADEMIC" | "EVENT" | "ANNOUNCEMENT" | "OTHER";
    attachment: { public_id: string; url: string };
    createdAt: string;
    status: "ACTIVE" | "COMMING" | "DEACTIVATED" | "PENDING" | "SNOOSE";
}

const noticeSchema = new mongoose.Schema<INotice>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["ACADEMIC", "EVENT", "ANNOUNCEMENT", "OTHER"],
        default: "OTHER",
    },
    attachment: {
        public_id: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false,
        },
    },
    createdAt: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ["ACTIVE", "COMMING", "DEACTIVATED", "PENDING", "SNOOSE"],
    },
}, {timestamps: true});

export const NoticeModel =
    mongoose.models.Notice || mongoose.model("Notice", noticeSchema);
