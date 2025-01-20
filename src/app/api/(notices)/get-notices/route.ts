import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { connectDB } from "@/lib/db";
import { NoticeModel } from "@/models/Notice";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const limitParam = req.nextUrl.searchParams.get("limit");
        const limit = limitParam ? parseInt(limitParam, 10) : undefined;
        await connectDB();
        const activeNotices = await NoticeModel.find({});
        if (!activeNotices.length) {
            throwError("Notice data not found", 404);
        }
        const limitedNotices = limit
            ? activeNotices.slice(0, limit)
            : activeNotices;
        return createSuccessResponse({
            statusCode: 200,
            message: "Notices fetched successfully",
            data: limitedNotices,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
