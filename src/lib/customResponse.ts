import { NextResponse } from "next/server";

interface SuccessResponse<T = any> {
    statusCode: number;
    data?: T;
    message: string;
}

interface ErrorResponse {
    statusCode: number;
    errorMessage: string;
}

export function createSuccessResponse<T>(response: SuccessResponse<T>) {
    return NextResponse.json(
        { success: true, data: response.data, message: response.message },
        { status: response.statusCode },
    );
}

function createErrorResponse(response: ErrorResponse) {
    return NextResponse.json(
        { success: false, error: response.errorMessage },
        { status: response.statusCode },
    );
}

export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "CustomError";
    }
}

export function throwError(message: string, statusCode: number) {
    throw new CustomError(message, statusCode);
}

export function handleErrorResponse(error: any) {

    if (error instanceof CustomError) { 
        console.error("Error : ", error.message); // for debugging in development
        return createErrorResponse({ statusCode: error.statusCode, errorMessage: error.message });
    }
    console.error("Error : ", error.message); // for debugging in development
    return createErrorResponse({ statusCode: 500, errorMessage: "Something went wrong on server" });
}
