import { PageResponse } from "../../../../core/models/page-response";
import { GetlistBlacklistResponse } from "./getlist-blacklist-response"; 

export interface BlackListListItemDto extends PageResponse{
    items:GetlistBlacklistResponse[]
}
