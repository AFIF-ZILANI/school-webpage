import {
    createSuccessResponse,
    throwError,
    handleErrorResponse,
} from "@/lib/customResponse";
import { CreateResultExpectedData } from "@/types/requestExpectedTypes";
import { NextRequest } from "next/server";
import { IResult, ResultModel } from "@/models/Result";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { IStudent, StudentModel } from "@/models/Student";

// const VALID_ACADEMIC_YEAR = ["2024", "2025"];
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
            gpa,
            subjectsData,
            totalMark,
        }: CreateResultExpectedData = body;

        if (
            !academicYear ||
            !branch ||
            !group ||
            !roll ||
            !examType ||
            !studentClass ||
            !subjectsData.length ||
            !gpa ||
            !totalMark
        ) {
            return throwError("Missing required fields", 400);
        }

        // if (!VALID_ACADEMIC_YEAR.includes(academicYear)) {
        //     return throwError("Enter a valid academic year", 400);
        // }

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
        if (gpa < 1) {
            throwError("Invalid GPA", 400);
        }
        if (totalMark < 1) {
            throwError("Invalid totalMark", 400);
        }

        subjectsData.map((value) => {
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
                    branch,
                    group,
                    roll,
                },
            },
        ]);

        if (existResult.length) {
            return throwError(
                "This Result data already exist on database",
                400,
            );
        }

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

        if (!student) {
            throwError("Invalid Student data", 400);
        }

        const createdResult = await ResultModel.create<IResult>({
            academicYear,
            examType,
            studentClass,
            branch,
            group,
            roll,
            subjectData: subjectsData,
            totalMark,
            student: new mongoose.Types.ObjectId(student[0]._id),
            gpa,
        });
        console.log("test result:", createdResult);
        if (!createdResult) {
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
