import mongoose from "mongoose";
export interface ISubjectResult {
    subject: string;
    achievedMark: number;
    fullMark: number;
    grade: string;
    teacherStatement: String;
}

export interface IResult {
    _id: string
    academicYear: string;
    examType: "BINOMIAL" | "FINAL" | "MODEL";
    subjectData: ISubjectResult[];
    totalMark: number;
    gpa: number;
    student: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
}
const SubjectResultSchema = new mongoose.Schema<ISubjectResult>({
    subject: { type: String, required: true },
    achievedMark: { type: Number, required: true },
    fullMark: { type: Number, required: true },
    grade: { type: String, required: true },
    teacherStatement: {
        type: String,
        required: false,
    },
});

const resultSchema = new mongoose.Schema<IResult>({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    academicYear: { type: String, required: true },
    examType: {
        type: String,
        required: true,
        enum: ["BINOMIAL", "FINAL", "MODEL"],
    },
    subjectData: [SubjectResultSchema],
    totalMark: { type: Number, required: true },
    gpa: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date,
    },
});

export const ResultModel =
    mongoose.models.Result || mongoose.model<IResult>("Result", resultSchema);
