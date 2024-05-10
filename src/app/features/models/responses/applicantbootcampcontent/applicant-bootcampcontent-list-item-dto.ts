import { PageResponse } from "../../../../core/models/page-response";
import { GetlistApplicantBootcampcontentResponse } from "./getlist-applicant-bootcampcontent-response";

export interface ApplicantBootcampcontentListItemDto extends PageResponse{
    items:GetlistApplicantBootcampcontentResponse[]
}
