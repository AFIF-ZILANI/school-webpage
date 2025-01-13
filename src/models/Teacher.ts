import mongoose, { Schema, Document } from "mongoose";

interface ITeacher {
    fullName: string;
    subject: string;
    id: string;
    position: string;
    yearsOfExperience: number;
    createdAt?: Date;
}

const TeacherSchema: Schema = new Schema<ITeacher>({
    fullName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: false,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
    },
});

export const TeacherModel =
    mongoose.models.Teacher ||
    mongoose.model<ITeacher>("Teacher", TeacherSchema);
