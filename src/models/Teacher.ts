import mongoose, { Schema } from "mongoose";

export interface ITeacher {
    _id?: string;
    fullName: string;
    subject: string;
    id: string;
    position: string;
    avatar: {
        public_id: string;
        url: string;
    };
    yearsOfExperience: number;
    email?: string;
    phone: string;
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
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
    },
});

export const TeacherModel =
    mongoose.models.Teacher ||
    mongoose.model<ITeacher>("Teacher", TeacherSchema);
