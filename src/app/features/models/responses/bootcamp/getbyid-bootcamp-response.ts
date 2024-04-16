export interface GetbyidBootcampResponse {
    id:number;
    name:string;
    instructorId:string;
    instructorFirstName: string;
    instructorLastName: string;
    bootcampStateId:number;
    bootcampStateName: string;
    bootcampImageId: number;
    bootcampImageImagePath:string;
    startDate:Date;
    endDate:Date;
}
