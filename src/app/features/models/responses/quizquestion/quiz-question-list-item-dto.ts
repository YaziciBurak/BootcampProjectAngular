import { PageResponse } from "../../../../core/models/page-response";
import { GetlistQuizQuestionResponse } from "./getlist-quiz-question-response";

export interface QuizQuestionListItemDto extends PageResponse {
    items:GetlistQuizQuestionResponse[];
}
