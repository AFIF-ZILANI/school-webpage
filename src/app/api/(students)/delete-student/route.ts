import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { StudentModel, IStudent } from "@/models/Student";
import { v2 } from "cloudinary";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            throwError("`_id` of student is missing", 400);
        }

        const deletedStudent: IStudent | null =
            await StudentModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            throwError("Please enter a valid teacher _id", 400);
        }

        if (deletedStudent?.avatar?.public_id) {
            await v2.uploader.destroy(
                deletedStudent.avatar.public_id,
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
            message: "Student deleted successfully",
            data: null,
            statusCode: 200,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
