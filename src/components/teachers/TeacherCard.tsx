import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeacherCardProps {
    teacher: {
        name: string;
        image?: string;
        position: string;
    };
}

export function TeacherCard({ teacher }: TeacherCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-[100px] w-[100px]">
                    <AvatarImage src={teacher.image} alt={teacher.name} />
                    <AvatarFallback>
                        {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        {teacher.position}
                    </p>
                </div>
            </CardHeader>
        </Card>
    );
}
