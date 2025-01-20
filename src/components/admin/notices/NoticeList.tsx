"use client";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useGetData } from "@/lib/apiRequest";
import { DeleteItemComponent } from "@/components/util Comp/deleteItemComponent";
import { INotice } from "@/models/Notice";
import { NoticeFormProps } from "@/types/requestExpectedTypes";
import { SkeletonData } from "@/components/util Comp/skeletonCard";

export function NoticeList({
    setStatus,
    setFormData,
}: {
    setStatus: Dispatch<SetStateAction<"CREATING" | "UPDATING" | null>>;
    setFormData: Dispatch<SetStateAction<NoticeFormProps>>;
}) {
    const [notices, setNotices] = useState<INotice[]>([]);
    const [updatNoticeList, setUpdateNoticeList] = useState(false);
    const { isLoading, data, refetch } = useGetData("/get-notices");

    useEffect(() => {
        if (data) {
            setNotices(data.data);
        }
        if (updatNoticeList) {
            refetch();
        }
    }, [data, updatNoticeList, refetch]);

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col gap-3">
                    <SkeletonData />
                    <SkeletonData />
                    <SkeletonData />
                    <SkeletonData />
                    <SkeletonData />
                </div>
            ) : notices.length ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notices.map((notice) => (
                            <TableRow key={notice._id}>
                                <TableCell>{notice.title}</TableCell>
                                <TableCell>{notice.category}</TableCell>
                                <TableCell>
                                    {formatDate(notice.createdAt)}
                                </TableCell>
                                <TableCell className="flex items-center gap-3 justify-end">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="mr-2"
                                        onClick={() => {
                                            setFormData({
                                                _id: notice._id,
                                                title: notice.title,
                                                category: notice.category,
                                                content: notice.content,
                                                status: notice.status,
                                                attachment: notice.attachment,
                                            });
                                            setStatus("UPDATING");
                                        }}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <DeleteItemComponent
                                        setUpdateList={setUpdateNoticeList}
                                        id={notice._id ?? ""}
                                        item="notice"
                                        endpoint="/delete-notice"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Label>No notices available</Label>
            )}
        </>
    );
}
