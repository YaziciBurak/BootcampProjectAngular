export interface CreateBootcampRequest {
    name: string;
    instructorId: string;
    bootcampStateId: number;
    startDate: Date;
    endDate: Date;
    detail: string;
    deadline: Date;
}
