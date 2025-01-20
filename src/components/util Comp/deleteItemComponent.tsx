import { Loader2, Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AlertDialogComponent } from "./alertComponent";
import { useDeleteData } from "@/lib/apiRequest";
import { toast } from "@/hooks/use-toast";

export function DeleteItemComponent({
    id,
    item,
    endpoint,
    setUpdateList,
}: {
    id: string;
    item: string;
    endpoint: string;
    setUpdateList: Dispatch<SetStateAction<boolean>>;
}) {
    const { isError, isLoading, isSuccess, mutate } = useDeleteData(endpoint);
    const [deleteItemTriggerd, setDeleteItemTriggerd] = useState(false);
    const [deleteFuncTriggerd, setDeleteFuncTriggerd] = useState(false);

    useEffect(() => {
        if (deleteItemTriggerd && id && !deleteFuncTriggerd) {
            setDeleteFuncTriggerd(true);
            mutate(id);
        } else if (deleteItemTriggerd && deleteFuncTriggerd) {
            setDeleteItemTriggerd(false);
            setDeleteFuncTriggerd(false);
        }

        if (isSuccess) {
            setUpdateList(true);
            toast({
                title: "Success!",
                description: `${item} deleted successfully!`,
                variant: "default",
            });
        }

        if (isError) {
            toast({
                title: "Error",
                description: `Failed to delete the ${item}.`,
                variant: "destructive",
            });
        }
    }, [
        isError,
        isLoading,
        isSuccess,
        deleteItemTriggerd,
        deleteFuncTriggerd,
        id,
        mutate,
        item, 
        setUpdateList
    ]);

    return (
        <AlertDialogComponent item={item} setTrigger={setDeleteItemTriggerd}>
            {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
                <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </AlertDialogComponent>
    );
}
