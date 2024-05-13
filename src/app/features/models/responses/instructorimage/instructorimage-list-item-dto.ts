import { PageResponse } from "../../../../core/models/page-response";
import { GetlistInstructorimageResponse } from "./getlist-instructorimage-response";

export interface InstructorimageListItemDto extends PageResponse{
    items:GetlistInstructorimageResponse[];
}
