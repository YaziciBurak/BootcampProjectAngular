import { QuestionResponse } from "./question-response";

export interface GetbyidQuizResponse {
    id: number;
    applicantId: string;
    bootcampId: number;
    startTime: Date;
    endTime: Date;
}
