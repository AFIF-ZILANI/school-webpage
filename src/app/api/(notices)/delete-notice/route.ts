import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { INotice, NoticeModel } from "@/models/Notice";
import { v2 } from "cloudinary";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        console.log("Extracted ID: ", id);
        if (!id) {
            throwError("Notice id is missing", 400);
        }

        const deletedNotice: INotice | null =
            await NoticeModel.findByIdAndDelete(id);

        if (!deletedNotice) {
            throwError("Please enter a valid notice id", 400);
        }

        if (deletedNotice?.attachment.public_id) {
            await v2.uploader.destroy(
                deletedNotice.attachment.public_id,
                (error, result) => {
                    if (error) {
                        throwError("Failed to remove the old attachment", 500);
                    }
                    if (result.result !== "ok") {
                        throwError("Old attachment was not removed", 500);
                    }
                },
            );
        }

        return createSuccessResponse({
            message: "Notice deleted successfully",
            data: null,
            statusCode: 200,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
