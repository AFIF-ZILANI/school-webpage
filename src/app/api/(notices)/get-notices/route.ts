import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { connectDB } from "@/lib/db";
import { NoticeModel } from "@/models/Notice";

export async function GET() {
    try {
        await connectDB();
        const activeNotices = await NoticeModel.aggregate([
            { $match: { status: "active" } },
        ]);
        if (!activeNotices.length) {
            throwError("Notice data not found", 404);
        }
        return createSuccessResponse({
            statusCode: 200,
            message: "Notices fetched successfully",
            data: activeNotices,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
