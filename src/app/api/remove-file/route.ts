import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { v2 } from "cloudinary";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const public_id = req.nextUrl.searchParams.get("id");

        if (public_id) {
            await v2.uploader.destroy(public_id, (error, result) => {
                if (error) {
                    throwError("Failed to remove the old attachment", 500);
                }
                if (result.result !== "ok") {
                    throwError("Old attachment was not removed", 500);
                }
            });
        } else {
            throwError("public_id or `id` is missing", 400);
        }

        return createSuccessResponse({
            message: "File removed successfully",
            data: null,
            statusCode: 200,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
