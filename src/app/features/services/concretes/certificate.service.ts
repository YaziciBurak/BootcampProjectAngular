import { Injectable } from "@angular/core";
import { CertificateBaseService } from "../abstracts/certificate-base.service";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment.development';
import { PageRequest } from "../../../core/models/page-request";
import { Observable, map } from 'rxjs';
import { CertificateListItemDto } from "../../models/responses/certificate/certificate-list-item-dto";
import { DeleteCertificateResponse } from "../../models/responses/certificate/delete-certificate-response";
import { UpdateCertificateRequest } from "../../models/requests/certificate/update-certificate-request";
import { UpdateCertificateResponse } from "../../models/responses/certificate/update-certificate-response";
import { CreateCertificateRequest } from "../../models/requests/certificate/create-certificate-request";
import { CreateCertificateResponse } from "../../models/responses/certificate/create-certificate-response";
import { GetbyidCertificateResponse } from "../../models/responses/certificate/getbyid-certificate-response";

@Injectable({
    providedIn: 'root'
})
export class CertificateService extends CertificateBaseService {
    private readonly apiUrl: string = `${environment.API_URL}/certificates`

    constructor(private httpClient: HttpClient) { super(); }

    override getList(pageRequest: PageRequest): Observable<CertificateListItemDto> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.page,
            pageSize: pageRequest.pageSize
        };
        return this.httpClient.get<CertificateListItemDto>(this.apiUrl, {
            params: newRequest
        }).pipe(
            map((response) => {
                const newResponse: CertificateListItemDto = {
                    index: pageRequest.page,
                    size: pageRequest.pageSize,
                    count: response.count,
                    hasNext: response.hasNext,
                    hasPrevious: response.hasPrevious,
                    items: response.items,
                    pages: response.pages
                };
                return newResponse;
            })
        )
    }

    override delete(id: number): Observable<DeleteCertificateResponse> {
        return this.httpClient.delete<DeleteCertificateResponse>(`${this.apiUrl}/` + id);
    }

    override update(request: UpdateCertificateRequest): Observable<UpdateCertificateResponse> {
        return this.httpClient.put<UpdateCertificateResponse>(`${this.apiUrl}`, request);
    }

    override create(request: CreateCertificateRequest): Observable<CreateCertificateResponse> {
        return this.httpClient.post(`${this.apiUrl}`, request, {
            responseType: "blob" as "json",
            observe: "response"
        }).pipe(map(response => {
            const contentType = response.headers.get('Content-Type') ?? 'application/pdf';
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'sertifika.pdf';
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }
            const content = response.body as Blob;
            return {
                filename, contentType, content
            };
        }));
    }

    override getById(id: number): Observable<GetbyidCertificateResponse> {
        const newRequest: { [key: string]: string | number } = {
            id: id
        };
        return this.httpClient.get<GetbyidCertificateResponse>(`${this.apiUrl}/${id}`, {
            params: newRequest
        }).pipe(
            map((response) => {
                const newResponse: GetbyidCertificateResponse = {
                    id: response.id,

                };
                return newResponse;
            })
        );
    }

    override getByApplicantId(pageRequest: PageRequest): Observable<CertificateListItemDto> {
        const newRequest: { [key: string]: string | number } = {
            page: pageRequest.page,
            pageSize: pageRequest.pageSize
        };
        return this.httpClient.get<CertificateListItemDto>(`${this.apiUrl}/getbyapplicantid`, {
            params: newRequest
        }).pipe(
            map((response) => {
                const newResponse: CertificateListItemDto = {
                    index: pageRequest.page,
                    size: pageRequest.pageSize,
                    count: response.count,
                    hasNext: response.hasNext,
                    hasPrevious: response.hasPrevious,
                    items: response.items,
                    pages: response.pages
                };
                return newResponse;
            })
        )
    }


}