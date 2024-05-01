import { PageResponse } from "../../../../core/models/page-response";
import { GetlistQuestionResponse } from "./getlist-question-response";

export interface QuestionListItemDto extends PageResponse {
     items:GetlistQuestionResponse[];
}
