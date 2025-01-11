export interface GetResultExpectedData {
    academicYear: string;
    examType: "BINOMIAL" | "FINAL" | "MODEL";
    studentClass: "6" | "7" | "8" | "9" | "10";
    group: "A" | "B" | "C" | "G";
    studentRoll: string;
    gender: "BOY" | "GIRL";
}

export interface CreateSubjectResultExpectedData {
    subject: string;
    achievedMark: number;
    fullMark: number;
    grade: string;
}

export interface CreateResultExpectedData extends GetResultExpectedData {
    subjects: CreateSubjectResultExpectedData[];
    totalMark: number;
    gpa: number;
}
