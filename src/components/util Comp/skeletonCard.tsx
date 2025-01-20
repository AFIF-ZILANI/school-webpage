import { Skeleton } from "@/components/ui/skeleton";
export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

export function SkeletonData() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

export function NoticeDesktopSkeletonCard() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <Skeleton className="h-[35px] md:w-[600px] rounded-xl" />
                    <Skeleton className="h-[35px] md:w-[100px] rounded-xl" />
                </div>
                <div className="flex justify-between">
                    <Skeleton className="h-[35px] md:w-[500px] rounded-xl" />
                    <Skeleton className="h-[35px] md:w-[200px] rounded-xl" />
                </div>
            </div>
            <Skeleton className="h-[80px] md:w-[900px] rounded-xl" />
        </div>
    );
}
