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
import { Edit2, Trash2 } from "lucide-react";
import { useGetData } from "@/lib/apiRequest";

interface IResult {
    id: string;
    studentId: string;
    class: string;
    exam: string;
    grade: string;
}
export function ResultList() {
    const { data: results } = useGetData("/get-result");

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((result: IResult) => (
                    <TableRow key={result.id}>
                        <TableCell>{result.studentId}</TableCell>
                        <TableCell>{result.class}</TableCell>
                        <TableCell>{result.exam}</TableCell>
                        <TableCell>{result.grade}</TableCell>
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
    );
}
