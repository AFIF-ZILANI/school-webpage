"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getResultExpecteDataType } from "@/types/requestExpectedTypes";
import { merienda } from "../fonts";

export default function Marksheet({
    data,
}: {
    data: getResultExpecteDataType;
}) {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const element = document.getElementById("marksheet");
            if (!element) {
                throw new Error("Element not found");
            }
            const canvas = await html2canvas(element, {
                scale: 2, // Increase resolution
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add a background pattern
            pdf.setDrawColor(0, 0, 0);
            pdf.setLineWidth(0.1);
            for (let i = 0; i < pdfWidth; i += 10) {
                pdf.line(i, 0, i, pdfHeight);
            }

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            // Add watermark
            // pdf.setFontSize(40);
            // pdf.setTextColor(200, 200, 200);
            // pdf.setFont("helvetica", "italic");
            // pdf.text("RAIGAON HIGH SCHOOL", pdfWidth / 2, pdfHeight / 2, {
            //     align: "center",
            //     angle: 45,
            // });

            pdf.save(`marksheet-${data.student.fullName}.pdf`);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="space-y-4 min-w-[70vw] md:min-w-[50vw] lg:min-w-[40vw]">
            <Card className="p-4 md:p-8 bg-white shadow-2xl " id="marksheet">
                <div className="relative p-3">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50 rounded-lg" />

                    {/* Header */}
                    <div className="relative mb-1 md:mb-8 pb-1 border-b-2 border-gray-200">
                        <div className="text-center">
                            <h1
                                className={`text-2xl md:text-4xl font-bold text-gray-900 mb-2 ${merienda.className}`}
                            >
                                Raigaon High School
                            </h1>
                            <div
                                className={`inline-block px-4 md:px-6 rounded-full text-sm md:text-lg ${merienda.className}`}
                            >
                                {data.examType} Examination -{" "}
                                {data.academicYear}
                            </div>
                            <div className="text-gray-700 md:text-[0.85rem] text-[0.65rem]">
                                (Official Marksheet By The Principal of Raigaon
                                High School)
                            </div>
                        </div>
                        <div className="text-gray-400 text-[0.65rem] mt-4">
                            Marsheet ID: {data._id}
                        </div>
                    </div>
                    {/* Student Info */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8 bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-100">
                        <div>
                            <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">
                                Student Name
                            </p>
                            <p className="text-sm md:text-lg font-semibold text-gray-900">
                                {data.student.fullName}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">
                                Class
                            </p>
                            <p className="text-sm md:text-lg font-semibold text-gray-900">
                                {data.student.studentClass}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">
                                Branch
                            </p>
                            <p className="text-sm md:text-lg font-semibold text-gray-900">
                                {data.student.branch}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">
                                Roll Number
                            </p>
                            <p className="text-sm md:text-lg font-semibold text-gray-900">
                                {data.student.roll}
                            </p>
                        </div>
                    </div>

                    {/* Marks Table */}
                    <div className="overflow-hidden rounded-lg border border-gray-200 mb-4 md:mb-8">
                        <table className="w-full border-collapse text-xs md:text-sm">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <th className="border-b px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-900">
                                        Subject
                                    </th>
                                    <th className="border-b px-2 md:px-4 py-2 md:py-3 text-center font-semibold text-gray-900">
                                        Achieved Mark
                                    </th>
                                    <th className="border-b px-2 md:px-4 py-2 md:py-3 text-center font-semibold text-gray-900">
                                        Full Mark
                                    </th>
                                    <th className="border-b px-2 md:px-4 py-2 md:py-3 text-center font-semibold text-gray-900">
                                        Grade
                                    </th>
                                    <th className="border-b px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-900">
                                        Teacher&apos;s Comment
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.subjectData.map((subject, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="border-b px-2 md:px-4 py-2 md:py-3 text-gray-900 font-medium">
                                            {subject.subject}
                                        </td>
                                        <td className="border-b px-2 md:px-4 py-2 md:py-3 text-center text-gray-900">
                                            <span className="inline-block bg-blue-50 text-blue-700 px-2 md:px-3 py-1 rounded-full font-medium">
                                                {subject.achievedMark}
                                            </span>
                                        </td>
                                        <td className="border-b px-2 md:px-4 py-2 md:py-3 text-center text-gray-600">
                                            {subject.fullMark}
                                        </td>
                                        <td className="border-b px-2 md:px-4 py-2 md:py-3 text-center">
                                            <span
                                                className={`inline-block px-2 md:px-3 py-1 rounded-full font-medium ${
                                                    subject.grade === "A+"
                                                        ? "bg-green-50 text-green-700"
                                                        : subject.grade === "A"
                                                          ? "bg-blue-50 text-blue-700"
                                                          : "bg-yellow-50 text-yellow-700"
                                                }`}
                                            >
                                                {subject.grade}
                                            </span>
                                        </td>
                                        <td className="border-b px-2 md:px-4 py-2 md:py-3 text-gray-600">
                                            {subject.teacherStatement}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-50 font-medium">
                                    <td
                                        colSpan={2}
                                        className="border-b px-2 md:px-4 py-2 md:py-3 text-gray-900"
                                    >
                                        Total Marks
                                    </td>
                                    <td className="border-b px-2 md:px-4 py-2 md:py-3 text-center text-gray-900">
                                        {data.totalMark}
                                    </td>
                                    <td
                                        colSpan={2}
                                        className="border-b px-2 md:px-4 py-2 md:py-3 text-gray-900"
                                    >
                                        GPA:{" "}
                                        <span className="text-blue-600 font-semibold">
                                            {data.gpa}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="flex md:flex-row justify-between items-end mt-8 md:mt-16">
                        <div className="text-xs md:text-sm text-gray-500">
                            Date: {new Date().toLocaleDateString()}
                        </div>
                        <div className="text-center mt-4 md:mt-0">
                            <div className="w-32 md:w-48 border-t-2 border-gray-400 pt-1">
                                <p className="font-semibold text-xs text-gray-900">
                                    Principal&apos;s Signature
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Watermark */}
                    {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                        <div className="transform rotate-45 text-4xl md:text-6xl font-bold text-gray-900">
                            RAIGAON HIGH SCHOOL
                        </div>
                    </div> */}
                </div>
            </Card>
            <Button
                onClick={handleDownload}
                disabled={downloading}
                className="ml-auto bg-primary shadow-lg hover:shadow-xl my-4 text-[0.9rem]"
            >
                <Download className="mr-2 h-4 w-4" />
                <span>
                    {downloading ? "Generating PDF..." : "Download Marksheet"}
                </span>
            </Button>
        </div>
    );
}
