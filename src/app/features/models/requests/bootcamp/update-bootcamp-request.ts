export interface UpdateBootcampRequest {
    id:number;
    name:string;
    instructorId:string;
    instructorFirstName: string;
    instructorLastName: string;
    bootcampStateId:number;
    bootcampStateName: string;
    bootcampImageId: number;
    bootcampImagePath:string;
    startDate:Date;
    endDate:Date;
}
