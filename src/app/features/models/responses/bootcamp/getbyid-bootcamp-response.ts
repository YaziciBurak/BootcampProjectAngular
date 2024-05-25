export interface GetbyidBootcampResponse {
    id: number;
    name: string;
    instructorId: string;
    instructorFirstName: string;
    instructorLastName: string;
    instructorImageId: number;
    instructorImagePath: string;
    bootcampStateId: number;
    bootcampStateName: string;
    bootcampImageId: number;
    bootcampImagePath: string;
    detail: string;
    deadline: Date;
    startDate: Date;
    endDate: Date;
    ifApplicantApplied?: boolean;
}
