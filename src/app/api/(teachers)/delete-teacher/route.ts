import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { TeacherModel, ITeacher } from "@/models/Teacher";
import { v2 } from "cloudinary";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            throwError(" Teacher _id is missing", 400);
        }

        const deletedTeacher: ITeacher | null =
            await TeacherModel.findByIdAndDelete(id);

        if (!deletedTeacher) {
            throwError("Please enter a valid teacher _id", 400);
        }

        if (deletedTeacher?.avatar.public_id) {
            await v2.uploader.destroy(
                deletedTeacher.avatar.public_id,
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

        return createSuccessResponse({
            message: "Teacher deleted successfully",
            data: null,
            statusCode: 200,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
