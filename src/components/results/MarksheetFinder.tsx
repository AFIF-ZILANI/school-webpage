"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAddData } from "@/lib/apiRequest";
import { AxiosError } from "axios";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Marksheet from "@/components/results/Marksheet";
import { Loader2, Search, ArrowRight, ArrowLeft } from "lucide-react";
import { getResultExpecteDataType } from "@/types/requestExpectedTypes";
import { CustomError } from "@/lib/customResponse";

const years = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString(),
);
const examTypes = ["BINOMIAL", "FINAL", "MODEL"];
const classes = ["6", "7", "8", "9", "10"];
const branches = ["BOY", "GIRL"];
const groups = ["A", "B", "C", "G"];

export default function MarksheetFinder() {
    const [result, setResult] = useState<getResultExpecteDataType | null>(null);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        academicYear: "",
        examType: "",
        studentClass: "",
        branch: "",
        group: "",
        roll: "",
    });

    const {
        isLoading,
        error,
        mutate,
        isError,
        status,
        variables,
        context,
        isIdle,
        failureCount,
        isPaused,
        isSuccess,
        reset,
        data,
    } = useAddData("/get-results");
    // useEffect(() => {
    //     console.log("is loading", isLoading);
    //     console.log("is error", isError);
    //     console.log("Error", error);
    //     console.log("status", status);
    //     console.log("variables", variables);
    //     console.log("context", context);
    //     console.log("is Idle", isIdle);
    //     console.log("failure Count", failureCount);
    //     console.log("is paused", isPaused);
    //     console.log("is success", isSuccess);
    //     console.log("data", data);

    // }, [isLoading, error, isError]);
    const handleSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        mutate(formData, {
            onSuccess(data) {
                console.log("Test Result Data:", data);
                setResult(data.data);
            },
        });
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const isStep1Valid = formData.academicYear && formData.examType;
    const isStep2Valid =
        formData.studentClass &&
        formData.branch &&
        formData.roll &&
        ((["9", "10"].includes(formData.studentClass) &&
            formData.group === "G") ||
            (!["9", "10"].includes(formData.studentClass) &&
                ["A", "B", "C"].includes(formData.group)));

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Academic Year
                </label>
                <Select
                    value={formData.academicYear}
                    onValueChange={(value) => {
                        // console.log("Test academic Year:", value);
                        setFormData({ ...formData, academicYear: value });
                        // console.log("Test formdata:", formData);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Exam Type
                </label>
                <Select
                    value={formData.examType}
                    onValueChange={(value) =>
                        setFormData({ ...formData, examType: value })
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Exam Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {examTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button
                className="w-full mt-8 bg-primary shadow-lg hover:shadow-xl h-12 text-lg max-w-[200px]"
                onClick={handleNext}
                disabled={!isStep1Valid}
            >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Class
                </label>
                <Select
                    value={formData.studentClass}
                    onValueChange={(value) => {
                        setFormData({
                            ...formData,
                            studentClass: value,
                            group: ["9", "10"].includes(value)
                                ? "G"
                                : formData.group,
                        });
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                        {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                                Class {cls}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Branch
                </label>
                <Select
                    value={formData.branch}
                    onValueChange={(value) =>
                        setFormData({ ...formData, branch: value })
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                        {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                                {branch}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Group
                </label>
                <Select
                    value={formData.group}
                    onValueChange={(value) =>
                        setFormData({ ...formData, group: value })
                    }
                    disabled={["9", "10"].includes(formData.studentClass)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Group" />
                    </SelectTrigger>
                    <SelectContent>
                        {groups
                            .filter((group) => {
                                if (
                                    ["9", "10"].includes(formData.studentClass)
                                ) {
                                    return group === "G";
                                }
                                return group !== "G";
                            })
                            .map((group) => (
                                <SelectItem key={group} value={group}>
                                    Group {group}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Roll Number
                </label>
                <Input
                    placeholder="Enter Roll Number"
                    value={formData.roll}
                    onChange={(e) =>
                        setFormData({ ...formData, roll: e.target.value })
                    }
                    className="w-full h-12 text-lg"
                />
            </div>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 h-12"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                </Button>
                <Button
                    className="flex-1 bg-primary shadow-lg hover:shadow-xl h-12"
                    onClick={handleSearch}
                    disabled={isLoading || !isStep2Valid}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Searching...
                        </>
                    ) : (
                        <>
                            <Search className="mr-2 h-5 w-5" />
                            Find Result
                        </>
                    )}
                </Button>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 flex flex-col items-center">
            <Card className="p-8 shadow-xl bg-white/80 backdrop-blur-sm md:w-[50vw] w-[95vw] min-w-[45vw]">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step >= 1
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            1
                        </div>
                        <div
                            className={`h-1 w-16 mx-2 ${
                                step > 1 ? "bg-primary" : "bg-gray-200"
                            }`}
                        />
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step >= 2
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            2
                        </div>
                    </div>

                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>Year & Exam</span>
                        <span>Student Details</span>
                    </div>
                </div>

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}

                {isError && error instanceof AxiosError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <p className="text-red-600 text-center font-medium">
                            {error.response?.status === 500
                                ? error.message
                                : error.response?.status === 404
                                  ? error.message
                                  : "Invalid Data, Please Try Again!"}
                        </p>
                    </motion.div>
                )}
            </Card>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Marksheet data={result} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
