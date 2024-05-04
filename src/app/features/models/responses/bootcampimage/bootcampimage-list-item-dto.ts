import { PageResponse } from "../../../../core/models/page-response";
import { GetlistBootcampimageResponse } from "./getlist-bootcampimage-response";

export interface BootcampimageListItemDto extends PageResponse {
    items:GetlistBootcampimageResponse[];
}
