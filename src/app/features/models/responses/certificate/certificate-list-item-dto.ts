import { PageResponse } from "../../../../core/models/page-response";
import { GetlistBootcampResponse } from "../bootcamp/getlist-bootcamp-response";

export interface CertificateListItemDto extends PageResponse {
    items: GetlistBootcampResponse[]
}