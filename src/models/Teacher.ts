import mongoose, { Schema, Document } from 'mongoose';

interface ITeacher {
    name: string;
    subject: string;
    yearsOfExperience: number;
    isActive: boolean;
}

const TeacherSchema: Schema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    subject: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
});

export const TeacherModel = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);