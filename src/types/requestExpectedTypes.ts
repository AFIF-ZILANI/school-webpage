export interface GetResultExpectedData {
    academicYear: string;
    examType: "BINOMIAL" | "FINAL" | "MODEL";
    studentClass: "6" | "7" | "8" | "9" | "10";
    group: "A" | "B" | "C" | "G";
    roll: string;
    branch: "BOY" | "GIRL";
}

export interface CreateSubjectResultExpectedData {
    subject: string;
    achievedMark: number;
    fullMark: number;
    grade: string;
}

export interface CreateResultExpectedData extends GetResultExpectedData {
    subjectsData: CreateSubjectResultExpectedData[];
    totalMark: number;
    gpa: number;
}

export interface getSubjectResultExpectedData {
    subject: string;
    achievedMark: number;
    fullMark: number;
    grade: string;
    teacherStatement: String;
}
export interface getResultExpecteDataType {
    student: {
        fullName: string;
        id?: string;
        studentClass: "6" | "7" | "8" | "9" | "10";
        branch: "BOY" | "GIRL";
        group: "A" | "B" | "C" | "G";
        roll: string;
        subject: "SCIENCE" | "ARTS" | "COMMERCE" | "VOCATIONAL" | "GENERAL";
    };
    academicYear: string;
    examType: "BINOMIAL" | "FINAL" | "MODEL";
    subjectData: getSubjectResultExpectedData[];
    totalMark: number;
    gpa: number;
}


export interface CreateTeacherExpectedDataType {
    fullName: string
    id?: string
    position: string
    avatar: {
        public_id: string,
        url: string
    },
    subject: string
    yearsOfExperience: number
}

export interface NoticeFormProps {
    title: string;
    content: string;
    category: string;
    file: {
        public_id: string;
        url: string;
    };
    isWithAttachment: boolean
}