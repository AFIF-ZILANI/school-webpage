import { createSuccessResponse } from "@/lib/customResponse";
import { ImageModel } from "@/models/Gallery";
import { NoticeModel } from "@/models/Notice";
import { StudentModel } from "@/models/Student";
import { TeacherModel } from "@/models/Teacher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const [studentsCount, teachersCount, noticesCount, galleryCount] = await Promise.all([
            StudentModel.countDocuments(),
            TeacherModel.countDocuments(),
            NoticeModel.countDocuments(),
            ImageModel.countDocuments()
        ]);

        return createSuccessResponse({
            message: "Dashboard data got successfully!",
            data: {
                students: studentsCount,
                teachers: teachersCount,
                notices: noticesCount,
                gallery: galleryCount
            },
            statusCode: 200
        });
    } catch (error) {
        return createSuccessResponse({
            message: "Failed to get dashboard data",
            data: null,
            statusCode: 500
        });
    }
}