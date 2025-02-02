import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { connectDB } from "@/lib/db";
import {
    validateBangladeshiPhone,
    validateEmail,
} from "@/lib/validation-utils";
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
            yearsOfExperience,
            id,
            avatar,
            email,
            phone,
        }: CreateTeacherExpectedDataType = body;

        // console.log(fullName, position, subject, yearsOfExperience, id, avatar);
        if (
            !fullName ||
            !position ||
            !subject ||
            !yearsOfExperience ||
            !avatar ||
            !id ||
            !phone
        ) {
            throwError("Some data of teacher is missing", 400);
        }

        if (yearsOfExperience < 0 || yearsOfExperience > 50) {
            throwError("Invalid Expreience year", 400);
        }

        if (!avatar.public_id || !avatar.url) {
            throwError("Teacher's Image missing!", 400);
        }

        if (!validateBangladeshiPhone(phone)) {
            throwError("Invalid phone number", 400);
        }

        if (!!email && !validateEmail(email)) {
            throwError("Invalid email", 400);
        }
        // Todo: Add validation logic for `id`

        await connectDB();

        const teacher = await TeacherModel.create({
            fullName,
            position,
            subject,
            yearsOfExperience,
            avatar,
            id,
            phone,
            email: email ? email : null,
        });
        // const teacher = await TeacherModel.create({
        //     fullName: "Hello Test",
        //     position: "Current Test",
        //     subject: "Test World",
        //     yearsOfExperience: 3,
        //     avatar_public_id: "Hello",
        //     avatar_url: "ope",
        //     id: "123",
        // });

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
        return handleErrorResponse(error);
    }
}
