"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2 } from "lucide-react";
import { useGetData } from "@/lib/apiRequest";
import { ITeacher } from "@/models/Teacher";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { SkeletonData } from "@/components/util Comp/skeletonCard";
import { DeleteItemComponent } from "@/components/util Comp/deleteItemComponent";

export function TeacherList({
    setFormData,
    setStatus,
}: {
    setFormData: Dispatch<SetStateAction<ITeacher>>;
    setStatus: Dispatch<SetStateAction<"CREATING" | "EDITING" | null>>;
}) {
    const { data, isLoading, refetch } = useGetData("/get-teachers");
    const [updateTeacherList, setUpdateTeacherList] = useState(false);
    const [teachers, setTeachers] = useState<ITeacher[]>([]);

    useEffect(() => {
        if (data) {
            setTeachers(data.data);
        }
        if (updateTeacherList) {
            refetch();
            setUpdateTeacherList(false);
        }
    }, [data, isLoading, updateTeacherList, refetch]);
    return (
        <div className="">
            {isLoading ? (
                <div className="flex flex-col gap-3">
                    <SkeletonData />
                    <SkeletonData />
                    <SkeletonData />
                    <SkeletonData />
                    <SkeletonData />
                </div>
            ) : teachers ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Subjects</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher._id}>
                                <TableCell className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={
                                                teacher.avatar &&
                                                teacher.avatar.url
                                            }
                                            className="object-contain"
                                            alt={teacher.fullName}
                                        />
                                        <AvatarFallback>
                                            {teacher.fullName
                                                .split(" ")
                                                .map((n: string) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    {teacher.fullName}
                                </TableCell>
                                <TableCell>{teacher.subject}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="mr-2"
                                        onClick={() => {
                                            setFormData({
                                                _id: teacher._id,
                                                fullName: teacher.fullName,
                                                avatar: teacher.avatar,
                                                yearsOfExperience:
                                                    teacher.yearsOfExperience,
                                                position: teacher.position,
                                                subject: teacher.subject,
                                                id: teacher.id,
                                                phone: teacher.phone,
                                                email: teacher.email,
                                            });
                                            setStatus("EDITING");
                                        }}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <DeleteItemComponent
                                        setUpdateList={
                                            setUpdateTeacherList
                                        }
                                        endpoint="/delete-teacher"
                                        item="teacher"
                                        id={teacher._id || ""}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Label>No teachers available</Label>
            )}
        </div>
    );
}
