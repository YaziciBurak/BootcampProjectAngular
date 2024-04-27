import { PageResponse } from "../../../../core/models/page-response";
import { GetlistApplicationstateResponse } from "./getlist-applicationstate-response";

export interface ApplicationstateListItemDto extends PageResponse{
    items:GetlistApplicationstateResponse[]
}
