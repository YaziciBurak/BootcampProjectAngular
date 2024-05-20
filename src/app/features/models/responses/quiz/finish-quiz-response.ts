import { GetlistResultResponse } from "../result/getlist-result-response";
import { QuizQuestionResultResponse } from "./quiz-question-result-response";

export interface FinishQuizResponse {
    result: GetlistResultResponse;
    questionResults: QuizQuestionResultResponse[];
    score: number;
}
