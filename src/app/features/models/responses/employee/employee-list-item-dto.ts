import { PageRequest } from "../../../../core/models/page-request";
import { PageResponse } from "../../../../core/models/page-response";
import { GetlistEmployeeResponse } from "./getlist-employee-response";

export interface EmployeeListItemDto extends PageResponse{
    items:GetlistEmployeeResponse[]
}