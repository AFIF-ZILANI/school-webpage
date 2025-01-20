import {
    createSuccessResponse,
    handleErrorResponse,
    throwError,
} from "@/lib/customResponse";
import { connectDB } from "@/lib/db";
import { NoticeModel } from "@/models/Notice";
import { NoticeFormProps } from "@/types/requestExpectedTypes";
import { NextRequest } from "next/server";

const valid_category = ["ACADEMIC", "EVENT", "ANNOUNCEMENT", "OTHER"];
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            category,
            attachment,
            title,
            content,
            isWithAttachment,
        }: NoticeFormProps = body;

        if (!category && !content && !title) {
            throwError("`title` or `content` or `cateory` is missing", 400);
        }

        if (!valid_category.includes(category)) {
            throwError("Invalid category selection", 400);
        }

        if (isWithAttachment && (!attachment.public_id || !attachment.url)) {
        }

        await connectDB();
        const notice = await NoticeModel.create({
            title,
            content,
            category,
            attachment,
            status: "ACTIVE",
        });

        console.log(notice)

        if (!notice) {
            throwError(
                "Something went wrong on server to creating notice",
                500,
            );
        }

        

        return createSuccessResponse({
            message: "Notice created successfully!",
            statusCode: 200,
            data: null,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
