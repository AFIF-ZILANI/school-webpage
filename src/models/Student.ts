import mongoose from "mongoose";
export interface IStudent {
    _id?: string;
    fullName: string;
    id?: string;
    studentClass: "6" | "7" | "8" | "9" | "10";
    branch: "BOY" | "GIRL";
    group: "A" | "B" | "C" | "G";
    roll: string;
    subject: "SCIENCE" | "ARTS" | "COMMERCE" | "VOCATIONAL" | "GENERAL";
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const StudentSchema = new mongoose.Schema<IStudent>({
    fullName: { type: String, required: true },
    id: { type: String, unique: true, required: false },
    studentClass: {
        type: String,
        required: true,
        enum: ["6", "7", "8", "9", "10"],
    },
    branch: {
        type: String,
        required: true,
        enum: ["BOY", "GIRL"],
    },
    subject: {
        type: String,
        required: true,
        enum: ["SCIENCE", "ARTS", "COMMERCE", "VOCATIONAL", "GENERAL"],
        validate: {
            validator: function (v) {
                if (["6", "7", "8"].includes(this.studentClass)) {
                    return v === "GENERAL";
                }
                return ["SCIENCE", "ARTS", "COMMERCE", "VOCATIONAL"].includes(
                    v,
                );
            },
            message:
                "Invalid Subject, Class 6, 7 and 8 only has the `GENERAL` subject.",
        },
    },
    group: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "G"],
        validate: {
            validator: function (v) {
                // For classes 9 and 10, only group 'G' is allowed
                if (["9", "10"].includes(this.studentClass)) {
                    return v === "G";
                }
                // For other classes, group 'G' is not allowed
                return ["A", "B", "C"].includes(v);
            },
            message: "Invalid group for the given class",
        },
    },
    roll: { type: String, required: true },
    avatar: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

StudentSchema.index(
    {
        studentClass: 1,
        branch: 1,
        group: 1,
        roll: 1,
    },
    { unique: true },
);

export const StudentModel =
    mongoose.models.Student ||
    mongoose.model<IStudent>("Student", StudentSchema);
