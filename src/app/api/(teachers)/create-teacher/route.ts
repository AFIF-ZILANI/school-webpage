import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { connectDB } from "@/lib/db";
import { TeacherModel } from "@/models/Teacher";
import { CreateTeacherExpectedDataType } from "@/types/requestExpectedTypes";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            fullName,
            position,
            subject,
            yearsOfExprience,
            id,
            avatar,
        }: CreateTeacherExpectedDataType = body;

        if (
            !fullName ||
            !position ||
            !subject ||
            !yearsOfExprience ||
            !avatar
        ) {
            throwError("Some data of teacher is missing", 400);
        }

        if (yearsOfExprience < 0 || yearsOfExprience > 50) {
            throwError("Invalid Exprience year", 400);
        }

        if (!avatar.public_id || !avatar.url) {
            throwError("Teacher's Image missing!", 400);
        }

        // Todo: Add validation logic for `id`

        await connectDB();

        const teacher = await TeacherModel.create({
            fullName,
            position,
            subject,
            yearsOfExprience,
            avatar,
            id: id ? id : null,
        });

        if (!teacher) {
            throwError(
                "Someting Went Wrong on server to create teacher in database",
                500,
            );
        }

        return createSuccessResponse({
            statusCode: 200,
            data: null,
            message: "Teacher created successfully!",
        });
    } catch (error) {
        handleErrorResponse(error);
    }
}
