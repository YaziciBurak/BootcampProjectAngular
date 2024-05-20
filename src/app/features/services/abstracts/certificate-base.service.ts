import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { PageRequest } from "../../../core/models/page-request";
import { CreateCertificateRequest } from '../../models/requests/certificate/create-certificate-request';
import { GetbyidCertificateResponse } from "../../models/responses/certificate/getbyid-certificate-response";
import { DeleteCertificateResponse } from "../../models/responses/certificate/delete-certificate-response";
import { CertificateListItemDto } from "../../models/responses/certificate/certificate-list-item-dto";
import { UpdateCertificateRequest } from "../../models/requests/certificate/update-certificate-request";
import { UpdateCertificateResponse } from "../../models/responses/certificate/update-certificate-response";
import { CreateCertificateResponse } from "../../models/responses/certificate/create-certificate-response";

@Injectable()
export abstract class CertificateBaseService {

    abstract getList(pageRequest: PageRequest): Observable<CertificateListItemDto>;
    abstract getById(id: number): Observable<GetbyidCertificateResponse>;
    abstract delete(id: number): Observable<DeleteCertificateResponse>;
    abstract update(request: UpdateCertificateRequest): Observable<UpdateCertificateResponse>;
    abstract create(request: CreateCertificateRequest): Observable<CreateCertificateResponse>;
    abstract getByApplicantId(pageRequest: PageRequest): Observable<CertificateListItemDto>;

}