import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { merienda } from "../fonts";
import { Label } from "@radix-ui/react-label";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ITeacher } from "@/models/Teacher";

export function TeacherCard({ teacher }: { teacher: ITeacher }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-[120px] w-[120px]">
                    <AvatarImage
                        src={teacher.avatar?.url}
                        alt={teacher.fullName}
                        className="object-cover"
                        loading="lazy"
                    />
                    <AvatarFallback>
                        {teacher.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3
                        className={`text-lg font-semibold ${merienda.className}`}
                    >
                        {teacher.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {teacher.position}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col">
                <div className="flex items-center gap-3">
                    <Label>Subjects:</Label>
                    <p className="text-sm text-muted-foreground">
                        {teacher.subject}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Label>Experience:</Label>
                    <p className="text-sm text-muted-foreground">
                        {teacher.yearsOfExperience} Years
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Separator />
                <div className="text-xs text-muted-foreground flex flex-col ">
                    {teacher.email && <span>email: {teacher.email}</span>}
                    {teacher.phone && <span>phone: {teacher.phone}</span>}
                </div>
            </CardFooter>
        </Card>
    );
}
