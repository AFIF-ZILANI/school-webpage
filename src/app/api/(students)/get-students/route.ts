import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { StudentModel } from "@/models/Student";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const studentClass = searchParams.get("class");
        const branch = searchParams.get("branch");
        const group = searchParams.get("group");
        const academicYear = searchParams.get("academicYear");
        const studentId = searchParams.get("studentId");
        await connectDB();

        let query = {};
        switch (true) {
            case !!studentId:
                query = { id: studentId };
                break;
            case !!academicYear && !studentClass && !branch && !group:
                query = { academicYear };
                break;
            case !!group && !!branch && !!studentClass && !!academicYear:
                query = { group, branch, class: studentClass, academicYear };
                break;
            case !!branch && !!studentClass && !!academicYear:
                query = { branch, class: studentClass, academicYear };
                break;
            case !!studentClass && !!academicYear:
                query = { class: studentClass, academicYear };
                break;
            default:
                throwError("Invalid query parameters", 400);
        }

        const students = await StudentModel.find(query);

        if (!students) {
            throwError("Not found students", 404);
        }

        return createSuccessResponse({
            message: "Successfully find out students",
            data: students,
            statusCode: 200,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
