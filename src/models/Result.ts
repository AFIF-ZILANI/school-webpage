import mongoose from "mongoose";
export interface ISubjectResult {
    subject: string;
    achievedMark: number;
    fullMark: number;
    grade: string;
    teacherComment?: string;
}

export interface IResult {
    examType: "Binomial" | "Final" | "Model";
    subjects: ISubjectResult[];
    totalMark: number;
    gpa: number;
    createdAt?: Date;
}
const SubjectResultSchema = new mongoose.Schema<ISubjectResult>({
    subject: { type: String, required: true },
    achievedMark: { type: Number, required: true },
    fullMark: { type: Number, required: true },
    grade: { type: String, required: true },
    teacherComment: { type: String },
});
const resultSchema = new mongoose.Schema<IResult>({
    examType: {
        type: String,
        required: true,
        enum: ["Binomial", "Final", "Model"],
    },

    subjects: [SubjectResultSchema],
    totalMark: { type: Number, required: true },
    gpa: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const ResultModel =
    mongoose.models.Result || mongoose.model<IResult>("Result", resultSchema);
