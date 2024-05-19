import { PageResponse } from "../../../../core/models/page-response";

import { GetlistCertificateResponse } from "./getlist-certificate-response";

export interface CertificateListItemDto extends PageResponse {
    items: GetlistCertificateResponse[]
}