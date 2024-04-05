import { PageResponse } from "../../../../core/models/page-response";
import { GetlistBootcampResponse } from "./getlist-bootcamp-response";

export interface BootcampListItemDto extends PageResponse {
    items:GetlistBootcampResponse[]
}