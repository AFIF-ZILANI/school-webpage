import {
    createSuccessResponse,
    handleErrorResponse,
} from "@/lib/customResponse";
import { connectDB } from "@/lib/db";
import { NoticeModel } from "@/models/Notice";
import { NoticeFormProps } from "@/types/requestExpectedTypes";
import { NextRequest } from "next/server";
import React from "react";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            category,
            file,
            title,
            content,
            isWithAttachment,
        }: NoticeFormProps = body;

        // logic

        await connectDB();
        const notice = await NoticeModel.create({
            title,
            content,
            category,
            file,
        });

        return createSuccessResponse({
            message: "Notice created successfully!",
            statusCode: 200,
            data: null,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
