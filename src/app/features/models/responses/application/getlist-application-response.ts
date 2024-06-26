export interface GetlistApplicationResponse {
    id: number;
    applicantId: string;
    applicantFirstName: string;
    applicantLastName: string;
    instructorId: string;
    instructorFirstName: string;
    instructorLastName: string;
    bootcampId: number;
    bootcampName: string;
    bootcampImageId: number;
    bootcampEndDate: Date;
    bootcampImagePath: string;
    applicationStateId: number;
    applicationStateName: string;
    createdDate: Date;
}
