import {
    createSuccessResponse,
    throwError,
    handleErrorResponse,
} from "@/lib/customResponse";
import { CreateResultExpectedData } from "@/types/requestExpectedTypes";
import { NextRequest } from "next/server";
import { IResult, ResultModel } from "@/models/Result";
import { connectDB } from "@/lib/db";

const VALID_ACADEMIC_YEAR = ["2024", "2025"];
const VALID_EXAM_TYPES = ["BINOMIAL", "FINAL", "MODEL"];
const VALID_CLASSES = ["6", "7", "8", "9", "10"];
const VALID_GENDERS = ["BOY", "GIRL"];
const VALID_GROUPS = ["A", "B", "C", "G"];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            academicYear,
            gender,
            group,
            studentRoll,
            examType,
            studentClass,
            gpa,
            subjects,
            totalMark,
        }: CreateResultExpectedData = body;

        if (
            !academicYear ||
            !gender ||
            !group ||
            !studentRoll ||
            !examType ||
            !studentClass ||
            !subjects.length ||
            !gpa ||
            !totalMark
        ) {
            return throwError("Missing required fields", 400);
        }

        if (!VALID_ACADEMIC_YEAR.includes(academicYear)) {
            return throwError("Enter a valid academic year", 400);
        }

        if (!VALID_EXAM_TYPES.includes(examType)) {
            return throwError(
                "Unexpected exam type, valid exam types are `BINOMIAL`, `FINAL`, `MODEL`",
                400,
            );
        }

        if (!VALID_CLASSES.includes(studentClass)) {
            return throwError("Class is required!", 400);
        }

        if (!VALID_GENDERS.includes(gender)) {
            return throwError("Gender is required `BOY` or `GIRL`", 400);
        }

        if (!VALID_GROUPS.includes(group)) {
            return throwError("Unexpected group!", 400);
        }

        if (
            (studentClass === "9" || studentClass === "10") &&
            (group === "A" || group === "B" || group === "C")
        ) {
            return throwError(
                `Unexpected data, class 9, 10 students don't have the '${group}'`,
                400,
            );
        }
        if (gpa < 1) {
            throwError("Invalid GPA", 400);
        }
        if (totalMark < 1) {
            throwError("Invalid totalMark", 400);
        }

        subjects.map((value) => {
            if (
                !value.subject ||
                !value.achievedMark ||
                !value.fullMark ||
                !value.grade
            ) {
                throwError("Subjects data is missing", 400);
            }
        });

        await connectDB();
        const existResult = await ResultModel.aggregate([
            {
                $match: {
                    academicYear,
                    examType,
                    studentClass,
                    gender,
                    group,
                    studentRoll,
                },
            },
        ]);

        if (existResult.length) {
            return throwError(
                "This Result data already exist on database",
                400,
            );
        }
        const createdResult = await ResultModel.create<IResult>({
            academicYear,
            examType,
            studentClass,
            gender,
            group,
            studentRoll,
            subjects,
            totalMark,
            gpa,
        });

        if (!createdResult.length) {
            return throwError(
                "Result not found, Try to validate your data again",
                404,
            );
        }

        return createSuccessResponse({
            statusCode: 200,
            message: "Student result created success fully",
            data: null,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
