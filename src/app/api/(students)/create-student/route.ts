import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { IStudent } from "@/models/Student";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            fullName,
            branch,
            group,
            roll,
            studentClass,
            avatar,
            id,
        }: IStudent = body;

        if (
            !fullName ||
            !branch ||
            !group ||
            !roll ||
            !studentClass ||
            !avatar ||
            !id
        ) {
            throwError("smone fields are missing", 400);
        }

        return createSuccessResponse({
            message: "student created successfully",
            data: null,
            statusCode: 200,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
