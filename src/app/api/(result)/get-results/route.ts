import { IStudent } from "./../../../../models/Student";
import {
    createSuccessResponse,
    throwError,
    handleErrorResponse,
} from "@/lib/customResponse";
import { GetResultExpectedData } from "@/types/requestExpectedTypes";
import { NextRequest } from "next/server";
import { IResult, ResultModel } from "@/models/Result";
import { connectDB } from "@/lib/db";
import { StudentModel } from "@/models/Student";
import mongoose from "mongoose";

const VALID_ACADEMIC_YEAR = ["2023-2024", "2025", "2024"];
const VALID_EXAM_TYPES = ["BINOMIAL", "FINAL", "MODEL"];
const VALID_CLASSES = ["6", "7", "8", "9", "10"];
const VALID_GENDERS = ["BOY", "GIRL"];
const VALID_GROUPS = ["A", "B", "C", "G"];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            academicYear,
            branch,
            group,
            roll,
            examType,
            studentClass,
        }: GetResultExpectedData = body;

        console.log(academicYear, branch, group, roll, examType, studentClass)
        if (
            !academicYear ||
            !branch ||
            !group ||
            !roll ||
            !examType ||
            !studentClass
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

        if (!VALID_GENDERS.includes(branch)) {
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

        await connectDB();
        const student: IStudent[] = await StudentModel.aggregate([
            {
                $match: {
                    studentClass,
                    branch,
                    group,
                    roll,
                },
            },
        ]);

        if (!student.length) {
            throwError("Invalid Student data", 400);
        }
        console.log("Test: student;", student)
        const result: IResult[] = await ResultModel.aggregate([
            {
                $match: {
                    academicYear,
                    examType,
                    student: new mongoose.Types.ObjectId(student[0]._id),
                },
            },
        ]);

        // console.log(result)
        if (!result.length) {
            return throwError(
                "Result not found, Try to validate your data again",
                404,
            );
        }
        
        const responseData = {
            ...result[0],
            student: {
                fullName: student[0].fullName,
            id: student[0].id,
            studentClass,
            roll,
            branch,
            group,
            }
        };

        return createSuccessResponse({
            statusCode: 200,
            message: "Data is valid",
            data: responseData,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}
