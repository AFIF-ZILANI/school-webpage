import mongoose from "mongoose";
export interface IStudent {
    fullName: string;
    id?: string;
    class: "6" | "7" | "8" | "9" | "10";
    branch: string;
    roll: string;
    academicYear: string;
}

const StudentSchema = new mongoose.Schema<IStudent>({
    fullName: { type: String, required: true },
    id: { type: String, unique: true, required: false },
    class: {
        type: String,
        required: true,
        enum: ["6", "7", "8", "9", "10"],
    },
    branch: { type: String, required: true },
    roll: { type: String, required: true },
    academicYear: { type: String, required: true },
});

export const StudentModel =
    mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
