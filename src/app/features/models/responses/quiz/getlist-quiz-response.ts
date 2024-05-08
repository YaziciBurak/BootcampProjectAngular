import { GetlistQuestionResponse } from "../question/getlist-question-response";

export interface GetlistQuizResponse {
    id:number;
    applicantId:string;
    applicantFirstName:string;
    applicantLastName:string;
    bootcampId:number;
    bootcampName:string;
    questions:GetlistQuestionResponse[];
    startTime:Date;
    endTime:Date;
}
