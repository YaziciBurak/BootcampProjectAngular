import { PageResponse } from "../../../../core/models/page-response";
import { GetlistApplicantResponse } from "./getlist-applicant-response";

export interface ApplicantListItemDto extends PageResponse{
    items:GetlistApplicantResponse[]
}
