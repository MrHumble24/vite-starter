// types.ts
export type Teacher = {
	class: number | null;
	created_at: string;
	firstName: string | null;
	id: number;
	lastName: string | null;
	password: string | null;
	phone: string | null;
	role: string | null;
	username: string | null;
	admin: boolean;
	profileImageUrl: string | null;

	classes?:
		| {
				id: number;
				name: string;
				teacher: number;
		  }[]
		| null;
};

export type Admins = {
	id: string;
	created_at: Date;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;
	role: string;
};

export type Classes = {
	id: number;
	created_at: string;
	name: string;
	teacher: number;
	teachers?: Teacher | null;
};
export type Exams = {
	class: number | null;
	created_at: string;
	id: number;
	name: string | null;
	scheduled: string | null;
	classes?: {
		id: number;
		name: string;
		teacher: number;
	} | null;
};
export type ExamsStudent = {
	class: number | null;
	created_at: string;
	id: number;
	name: number | null;
	scheduled: string | null;
	regularMark: number;
	listening: number;
	reading: number;
	writing: number;
	speaking: number;
	status: boolean;
	classes?: {
		id: number;
		name: string;
		teacher: number;
	} | null;
	students?: Students | null;
	exams?: Exams | null;
	studentID: number;
	examID: number;
};
export type Students = {
	age: string | null;
	class: number | null;
	created_at: string;
	phone: string;
	dateEnrollment: string | null;
	failedAttempts: number | null;
	firstName: string | null;
	id: number;
	role: string | null;
	lastName: string | null;
	password: string | null;
	telegramUsername: string | null;
	username: string | null;
	profileImageUrl: string | null;
	classes?: {
		id: number;
		name: string;
		teacher: number;
	} | null;
};

export type Tasks = {
	class: number | null;
	created_at: string;
	deadline: string | null;
	id: number;
	name: string | null;
	classes?: {
		id: number;
		name: string;
		teacher: number;
	} | null;
};

export type Assignments = {
	created_at: string;
	id: number;
	isChecked: boolean | null;
	isSubmitted: boolean | null;
	studentID: number | null;
	submittedTime: string | null;
	taskID: number | null;
	tasks?: Tasks | null;
	students?: Students | null;
	classes?: {
		id: number;
		name: string;
		teacher: number;
	} | null;
};

export type Marks = {
	created_at: string;
	exam: number | null;
	id: number;
	listening: number | null;
	ordinaryMark: number | null;
	reading: number | null;
	speaking: number | null;
	studentID: number | null;
	writing: number | null;
	students?: Students | null;
	exams?: Exams | null;
};

export type Books = {
	id: number;
	created_at: string;
	name: string;
	description: string;
};

export type BooksStudent = {
	id: number;
	created_at: string;
	name: string;
	description: string;
	studentID: number;
	bookID?: number;
	classID?: number;
	teacherID?: number;
	status: string;
	books?: Books | null;
	students?: Students | null;
	classes?: Classes | null;
};
