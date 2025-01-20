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
    teacherStatement: string;
}
export interface getResultExpecteDataType {
    _id?: string;
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
    fullName: string;
    id?: string;
    position: string;
    avatar: {
        public_id: string;
        url: string;
    };
    email: string;
    phone: string;
    subject: string;
    yearsOfExperience: number;
}

export interface NoticeFormProps {
    _id: string
    title: string;
    content: string;
    category: string;
    attachment: {
        public_id: string;
        url: string;
    };
    isWithAttachment?: boolean;
    status: string;
}

export interface UpdateNoticeExpectedDataType {
    _id: string;
    title: {
        isUpdating: boolean;
        data: string;
    };
    content: {
        isUpdating: boolean;
        data: string;
    };
    category: {
        isUpdating: boolean;
        data: string;
    };
    attachment: {
        isUpdating: boolean;
        data: {
            public_id: string;
            url: string;
        };
    };
    status: {
        isUpdating: boolean;
        data: string;
    };
}

export interface UpdateTeacherExpectedDataType {
    _id?: string;
    fullName: {
        isUpdating: boolean;
        data: string | null;
    };
    subject: {
        isUpdating: boolean;
        data: string | null;
    };
    position: {
        isUpdating: boolean;
        data: string | null;
    };
    avatar: {
        isUpdating: boolean;
        data: {
            public_id: string | null;
            url: string | null;
        };
    };
    yearsOfExperience: {
        isUpdating: boolean;
        data: number;
    };
    email: {
        isUpdating: boolean;
        data: string | null;
    };
    phone: {
        isUpdating: boolean;
        data: string | null;
    };
}
