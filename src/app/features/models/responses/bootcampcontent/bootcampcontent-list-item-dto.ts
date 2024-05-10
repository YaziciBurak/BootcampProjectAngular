import { PageResponse } from "../../../../core/models/page-response";
import { GetlistBootcampcontentResponse } from "./getlist-bootcampcontent-response";

export interface BootcampcontentListItemDto extends PageResponse{
    items:GetlistBootcampcontentResponse[]
}
