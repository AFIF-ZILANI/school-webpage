import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { connectDB } from "@/lib/db";
import { INotice, NoticeModel } from "@/models/Notice";
import {
    UpdateNoticeExpectedDataType,
} from "@/types/requestExpectedTypes";
import { v2 } from "cloudinary";
import { NextRequest } from "next/server";

const valid_category = ["ACADEMIC", "EVENT", "ANNOUNCEMENT", "OTHER"];
const valid_status = ["ACTIVE", "COMMING", "PENDING", "DEACTIVATED", "SNOOSE"];

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            _id,
            category,
            attachment,
            title,
            content,
            status,
        }: UpdateNoticeExpectedDataType = body;

        if (
            !title.isUpdating &&
            !content.isUpdating &&
            !category.isUpdating &&
            !attachment.isUpdating &&
            !status.isUpdating
        ) {
            throwError("Unnessary api call", 400);
        }

        if (!_id) {
            throwError("`_id` is missing", 400);
        }
        if (title.isUpdating && !title.data) {
            throwError("title is missing", 400);
        }

        if (content.isUpdating && !content.data) {
            throwError("Content is missing", 400);
        }

        if (category.isUpdating && !valid_category.includes(category.data)) {
            throwError("Invalid category", 400);
        }

        if (
            attachment.isUpdating &&
            (!attachment.data.public_id || !attachment.data.url)
        ) {
            throwError("Attachment is missing", 400);
        }

        if (status.isUpdating && !valid_status.includes(status.data)) {
            throwError("Invalid status", 400);
        }

        await connectDB();

        if (attachment.isUpdating) {
            const validNotice = await NoticeModel.findById(_id);

            if (!validNotice) {
                throwError("Invalid notice id", 400);
            }

            const validNoticeTyped: INotice = validNotice;

            if (validNoticeTyped.attachment.public_id) {
                await v2.uploader.destroy(
                    validNoticeTyped.attachment.public_id,
                    (error, result) => {
                        if (error) {
                            throwError(
                                "Failed to remove the old attachment",
                                500,
                            );
                        }
                        if (result.result !== "ok") {
                            throwError("Old attachment was not removed", 500);
                        }
                    },
                );
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {};

        if (title.isUpdating) updateData.title = title.data;
        if (content.isUpdating) updateData.content = content.data;
        if (category.isUpdating) updateData.category = category.data;
        if (attachment.isUpdating) updateData.attachment = attachment.data;
        if (status.isUpdating) updateData.status = status.data;

        if (
            !title.isUpdating ||
            !content.isUpdating ||
            !category.isUpdating ||
            !attachment.isUpdating ||
            !status.isUpdating
        ) {
        }
        const notice = await NoticeModel.findByIdAndUpdate(_id, updateData, {
            new: true,
        });

        if (!notice) {
            throwError("Notice not found!", 404);
        }

        return createSuccessResponse({
            message: "Notice Updated successfully!",
            statusCode: 200,
            data: notice,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
