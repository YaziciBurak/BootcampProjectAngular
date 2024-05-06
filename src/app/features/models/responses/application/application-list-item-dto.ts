import { PageResponse } from "../../../../core/models/page-response";
import { GetlistApplicationResponse } from "./getlist-application-response";

export interface ApplicationListItemDto extends PageResponse {
    items:GetlistApplicationResponse[];
}
