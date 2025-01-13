import mongoose, { Schema, Document } from "mongoose";

export interface ITeacher {
    fullName: string;
    subject: string;
    id: string;
    position: string;
    avatar_public_id: string;
    avatar_url: string;
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
    avatar_public_id: {
        type: String,
        required: true,
    },
    avatar_url: {
       type: String,
       required: true
    },
    createdAt: {
        type: Date,
    },
});

export const TeacherModel =
    mongoose.models.Teacher ||
    mongoose.model<ITeacher>("Teacher", TeacherSchema);
