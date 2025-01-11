import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { connectDB } from "@/lib/db";
import { TeacherModel } from "@/models/Teacher";

export async function GET() {
    try {
        await connectDB();
        const teachers = await TeacherModel.find({});
        if (!teachers.length) {
            throwError("Teacher data not found", 404);
        }
        return createSuccessResponse({
            statusCode: 200,
            message: "Teachers fetched successfully",
            data: teachers[0],
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
