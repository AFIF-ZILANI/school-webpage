import mongoose from "mongoose";
export interface ISubjectResult {
    subject: string;
    achievedMark: number;
    fullMark: number;
    grade: string;
}

export interface IResult {
    academicYear: string;
    examType: "BINOMIAL" | "FINAL" | "MODEL";
    studentClass: "6" | "7" | "8" | "9" | "10";
    gender: "BOY" | "GIRL";
    group: "A" | "B" | "C" | "G";
    studentRoll: string;
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
});

const resultSchema = new mongoose.Schema<IResult>({
    academicYear: { type: String, required: true },
    examType: {
        type: String,
        required: true,
        enum: ["BINOMIAL", "FINAL", "MODEL"],
    },
    studentClass: {
        type: String,
        required: true,
        enum: ["6", "7", "8", "9", "10"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["BOY", "GIRL"],
    },
    group: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "G"],
    },
    studentRoll: { type: String, required: true },
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
