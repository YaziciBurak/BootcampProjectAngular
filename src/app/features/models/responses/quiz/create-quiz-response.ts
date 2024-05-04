export interface CreateQuizResponse {
    id:number;
    applicantId:string;
    bootcampId:number;
    startTime:Date;
    endTime:Date;
    questionResponses:Record<number, string>
}