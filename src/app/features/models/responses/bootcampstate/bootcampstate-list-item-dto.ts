import { PageRequest } from "../../../../core/models/page-request";
import { PageResponse } from "../../../../core/models/page-response";
import { GetlistBootcampstateResponse } from "./getlist-bootcampstate-response";

export interface BootcampstateListItemDto extends PageResponse{
    items:GetlistBootcampstateResponse[]
}
