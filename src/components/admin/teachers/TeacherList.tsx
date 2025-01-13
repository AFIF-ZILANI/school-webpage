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
import { Edit2, Trash2 } from "lucide-react";
import { useGetData } from "@/lib/apiRequest";
import { ITeacher } from "@/models/Teacher";
import { useEffect, useState } from "react";

export function TeacherList() {
    const { data, isError, isLoading, error } = useGetData(
        "/get-teachers",
        "teachers",
    );

    const [teachers, setTeachers] = useState<ITeacher[] | null>(null);

    useEffect(() => {
        if (data){
          console.log(data.data);
        setTeachers(data.data);
        }
    }, [data, isLoading]);

    return (
        <div className="">
            {teachers ? (
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
                            <TableRow key={teacher.id}>
                                <TableCell className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={teacher.avatar_url ? teacher.avatar_url: ""}
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
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div>No teachers available</div>
            )}
        </div>
    );
}
