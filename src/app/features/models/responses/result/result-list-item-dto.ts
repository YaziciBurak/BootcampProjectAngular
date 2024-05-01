import { PageResponse } from "../../../../core/models/page-response";
import { GetlistResultResponse } from "./getlist-result-response";

export interface ResultListItemDto extends PageResponse{
    items:GetlistResultResponse[];
}
