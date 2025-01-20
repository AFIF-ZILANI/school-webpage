"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { useGetData } from "@/lib/apiRequest";
import { ITeacher } from "@/models/Teacher";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import { merienda } from "@/components/fonts";
import {
    Card,
    CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";

export default function TeachersPage() {
    const { data, isLoading } = useGetData("/get-teachers");
    const [teachers, setTeachers] = useState<ITeacher[] | null>(null);
    const [headmaster, setHeadmaster] = useState<ITeacher | null>(null);
    useEffect(() => {
        console.log(data);
        if (data) {
            setTeachers(data.data);
        }
        if (teachers) {
            const headmaster = teachers.shift();
            if (headmaster) {
                setHeadmaster(headmaster);
            }
        }
    }, [data, isLoading, teachers]);

    return (
        <div className="flex justify-center min-h-[90vh] overflow-hidden">
            <div className="py-8 flex flex-col items-center w-[90vw]">
                <PageHeader
                    title="Our Teachers"
                    description="Meet our dedicated teaching staff"
                />
                {isLoading ? (
                    <div className="">
                        <Loader2 className="w-8 h-8 animate-spin " />
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            {headmaster && (
                                <div className="w-full flex justify-center px-4">
                                    <Card className="w-full md:w-[80vw] flex flex-col md:flex-row bg-slate-800 text-white p-4">
                                        <div className="w-full md:w-[60%] flex flex-col md:flex-row gap-4 items-center p-4">
                                            <Avatar className="h-[150px] w-[150px] md:h-[200px] md:w-[200px]">
                                                <AvatarImage
                                                    src={headmaster.avatar?.url}
                                                    alt={headmaster.fullName}
                                                    className="object-cover rounded-3xl"
                                                    loading="lazy"
                                                />
                                                <AvatarFallback>
                                                    {headmaster.fullName
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-2">
                                                <h3
                                                    className={`text-2xl md:text-3xl font-bold ${merienda.className}`}
                                                >
                                                    {headmaster.fullName}
                                                </h3>
                                                <p className="text-md md:text-lg text-gray-300">
                                                    {headmaster.position}
                                                </p>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span>Subjects:</span>
                                                        <p className="text-sm text-gray-300">
                                                            {headmaster.subject}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span>Experience:</span>
                                                        <p className="text-sm text-gray-300">
                                                            {
                                                                headmaster.yearsOfExperience
                                                            }{" "}
                                                            Years
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col text-xs mt-1 text-gray-400">
                                                    {!headmaster.email && (
                                                        <span>
                                                            Email:{" "}
                                                            {headmaster.email}
                                                        </span>
                                                    )}
                                                    {!headmaster.phone && (
                                                        <span>
                                                            Phone:{" "}
                                                            {headmaster.phone}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <Separator
                                            orientation="vertical"
                                            className="bg-gray-200 h-full w-[1px] hidden md:block"
                                        />
                                        <CardFooter className="w-full md:w-[40%] flex flex-col p-4">
                                            <p
                                                className={`font-bold text-gray-400`}
                                            >
                                                &quot;At Raigaon High School, we
                                                believe in nurturing not just
                                                minds, but also hearts,
                                                inspiring every student to reach
                                                for the stars while staying
                                                grounded in compassion and
                                                integrity.&quot;
                                                <span
                                                    className={`text-white leading-8 block text-right ${merienda.className}`}
                                                >
                                                    - Nazrul Islam Shah,
                                                    Headmaster
                                                </span>
                                            </p>
                                        </CardFooter>
                                    </Card>
                                </div>
                            )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {teachers && teachers.length ? (
                                teachers.map((teacher, index) => (
                                    <TeacherCard
                                        key={index}
                                        teacher={teacher}
                                    />
                                ))
                            ) : (
                                <Label>No teachers available</Label>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
