export interface CreateQuizRequest {
    applicantId:string;
    bootcampId:number;
    startTime?:Date;
    endTime?:Date;
}
