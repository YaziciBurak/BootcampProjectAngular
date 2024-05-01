import { PageResponse } from "../../../../core/models/page-response";
import { GetlistQuizResponse } from "./getlist-quiz-response";

export interface QuizListItemDto extends PageResponse{
    items:GetlistQuizResponse[];
}
