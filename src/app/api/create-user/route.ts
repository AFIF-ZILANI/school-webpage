import { NextRequest, NextResponse } from "next/server";
import {
    createSuccessResponse,
    throwError,
    handleErrorResponse,
} from "@/lib/customResponse";
import { CreateUserType } from "@/types/requestBodyTypes";
import { validateEmail } from "@/lib/validation-utils";
import { dbConnect } from "@/lib/db";
import { UserModel, IUser } from "@/models/user";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
        email,
        fullName,
        studentClass,
        studentRoll,
        role,
        dateOfBirth,
        gender,
        userId,
        strem,
    }: CreateUserType = body;

    try {
        if (!email) {
            throwError("Email is required", 400);
        }
        if (!fullName) {
            throwError("Full name is required", 400);
        }
        if (!dateOfBirth) {
            throwError("Date of birth is required", 400);
        }
        if (!gender) {
            throwError("Gender is required", 400);
        }
        if (gender !== "MALE" && gender !== "FEMALE" && gender !== "OTHER") {
            throwError(
                "Gender should be ``MALE``, ``FEMALE`` or ``OTHER``",
                400,
            );
        }

        if (role !== "STUDENT" && role !== "TEACHER") {
            throwError("Role is missing", 400);
        }

        if (
            role === "STUDENT" &&
            (!studentClass || !studentRoll || !userId || !strem)
        ) {
            throwError("Student class, roll number and ID is required", 400);
        }

        if (
            role === "STUDENT" &&
            strem !== "SCIENCE" &&
            strem !== "COMMERCE" &&
            strem !== "ARTS"
        ) {
            throwError(
                "Stream should be ``SCIENCE``, ``COMMERCE`` or ``ARTS``",
                400,
            );
        }

        if (role === "TEACHER" && !userId) {
            throwError("Teacher ID is required", 400);
        }

        if (validateEmail(email) === false) {
            throwError("Invalid email", 400);
        }

        await dbConnect();
        const user = await UserModel.create<IUser>({
            fullName,
            email,
            dateOfBirth,
            gender,
            role,
            studentClass: role === "STUDENT" ? studentClass : null,
            userId: userId,
            studentRoll: role === "STUDENT" ? studentRoll : null,
            strem: role === "STUDENT" ? strem : null,
        });

        if (!user) {
            throwError("User not created", 500);
        }

        return createSuccessResponse({
            statusCode: 200,
            message: "User created successfully",
        });
    } catch (error: any) {
        return handleErrorResponse(error);
    }
}
