import { NextRequest } from "next/server";
import { UpdateTeacherExpectedDataType } from "@/types/requestExpectedTypes";
import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { ITeacher, TeacherModel } from "@/models/Teacher";
import { connectDB } from "@/lib/db";
import {
    validateBangladeshiPhone,
    validateEmail,
} from "@/lib/validation-utils";
import { v2 } from "cloudinary";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            _id,
            fullName,
            position,
            yearsOfExperience,
            avatar,
            subject,
            phone,
            email,
        }: UpdateTeacherExpectedDataType = body;

        if (
            !fullName.isUpdating &&
            !position.isUpdating &&
            !yearsOfExperience.isUpdating &&
            !subject.isUpdating &&
            !avatar.isUpdating &&
            !phone.isUpdating &&
            !email.isUpdating
        ) {
            throwError("Unnessary api call", 400);
        }

        if (!_id) {
            throwError("`_id` is required to updating teacher data", 400);
        }
        if (fullName.isUpdating && !fullName.data) {
            throwError("Teacher's `fullName` is missing", 400);
        }

        if (position.isUpdating && !position.data) {
            throwError("Teacher's `position` is missing", 400);
        }

        if (yearsOfExperience.isUpdating && !yearsOfExperience.data) {
            throwError(
                "Teacher's `yearsOfExperience is missing` is missing",
                400,
            );
        }

        if (subject.isUpdating && !subject.data) {
            throwError("Teacher's `subject` is missing", 400);
        }
        if (avatar.isUpdating && !avatar.data) {
            throwError("Teacher's `avatar` is missing", 400);
        }

        if (
            yearsOfExperience.isUpdating &&
            (yearsOfExperience.data < 0 || yearsOfExperience.data > 50)
        ) {
            throwError("Invalid Expreience year", 400);
        }

        if (avatar.isUpdating && !avatar.data?.public_id && !avatar.data?.url) {
            throwError("Invalid `avatar`", 400);
        }

        if (
            phone.isUpdating &&
            !!phone.data &&
            !validateBangladeshiPhone(phone.data)
        ) {
            throwError("Invlid phone number", 400);
        }

        if (email.isUpdating && !!email.data && !validateEmail(email.data)) {
            throwError("Invalid email address", 400);
        }

        await connectDB();

        if (avatar.isUpdating) {
            const validTeacher = await TeacherModel.findById(_id);
            if (!validTeacher) {
                throwError("Invalid teacher id", 400);
            }
            const validTeacherTyped: ITeacher = validTeacher;

            if (validTeacherTyped.avatar.public_id) {
                await v2.uploader.destroy(
                    validTeacherTyped.avatar.public_id,
                    (error, result) => {
                        if (error) {
                            throwError("Failed to remove the old avatar", 500);
                        }
                        if (result.result !== "ok") {
                            throwError("Old avatar was not removed", 500);
                        }
                    },
                );
            }
        }

        const updateData: any = {};
        if (fullName.isUpdating) updateData.fullName = fullName.data;
        if (position.isUpdating) updateData.position = position.data;
        if (yearsOfExperience.isUpdating)
            updateData.yearsOfExperience = yearsOfExperience.data;
        if (subject.isUpdating) updateData.subject = subject.data;
        if (avatar.isUpdating) updateData.avatar = avatar.data;
        if (phone.isUpdating) updateData.phone = phone.data;
        if (email.isUpdating) updateData.email = email.data;

        const updatedTeacher = await TeacherModel.findByIdAndUpdate(
            _id,
            updateData,
            { new: true },
        );
        if (!updatedTeacher) {
            throwError("Teacher not found", 404);
        }

        return createSuccessResponse({
            message: "Teacher data updated successfully",
            data: updatedTeacher,
            statusCode: 200,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
