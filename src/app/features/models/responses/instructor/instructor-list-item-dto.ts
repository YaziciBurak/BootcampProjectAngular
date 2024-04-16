import { PageResponse } from "../../../../core/models/page-response";
import { GetlistInstructorResponse } from "./getlist-instructor-response";

export interface InstructorListItemDto extends PageResponse{
    items:GetlistInstructorResponse[];
}