import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PageRequest } from '../../../core/models/page-request';
import { Observable, map } from 'rxjs';
import { ApplicantBootcampcontentListItemDto } from '../../models/responses/applicantbootcampcontent/applicant-bootcampcontent-list-item-dto';
import { ApplicantBootcampContentBaseService } from '../abstracts/applicant-bootcamp-content-base.service';
import { GetbyidApplicantBootcampcontentResponse } from '../../models/responses/applicantbootcampcontent/getbyid-applicant-bootcampcontent-response';
import { CreateApplicantBootcampcontentRequest } from '../../models/requests/applicantbootcampcontent/create-applicant-bootcampcontent-request';
import { CreateApplicantBootcampcontentResponse } from '../../models/responses/applicantbootcampcontent/create-applicant-bootcampcontent-response';
import { DeleteApplicantBootcampcontentResponse } from '../../models/responses/applicantbootcampcontent/delete-applicant-bootcampcontent-response';
import { UpdateApplicantBootcampcontentRequest } from '../../models/requests/applicantbootcampcontent/update-applicant-bootcampcontent-request';
import { UpdateApplicantBootcampcontentResponse } from '../../models/responses/applicantbootcampcontent/update-applicant-bootcampcontent-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantBootcampContentService extends ApplicantBootcampContentBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/ApplicantBootcampContents`
  constructor(private authService: AuthService, private httpClient: HttpClient) { super(); }

  override getList(pageRequest: PageRequest): Observable<ApplicantBootcampcontentListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<ApplicantBootcampcontentListItemDto>(this.apiUrl,
      {
        params: newRequest
      }).pipe(
        map((response) => {
          const newResponse: ApplicantBootcampcontentListItemDto = {
            index: pageRequest.pageIndex,
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

  override getById(id: number): Observable<GetbyidApplicantBootcampcontentResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: id
    };
    return this.httpClient.get<GetbyidApplicantBootcampcontentResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidApplicantBootcampcontentResponse = {
          id: response.id,
          applicantId: response.applicantId,
          bootcampContentId: response.bootcampContentId
        };
        return newResponse;
      })
    );
  }
  override create(request: CreateApplicantBootcampcontentRequest): Observable<CreateApplicantBootcampcontentResponse> {
    return this.httpClient.post<CreateApplicantBootcampcontentResponse>(`${this.apiUrl}`, request);
  }
  override delete(id: number): Observable<DeleteApplicantBootcampcontentResponse> {
    return this.httpClient.delete<DeleteApplicantBootcampcontentResponse>(`${this.apiUrl}/` + id);
  }
  override update(request: UpdateApplicantBootcampcontentRequest): Observable<UpdateApplicantBootcampcontentResponse> {
    return this.httpClient.put<UpdateApplicantBootcampcontentResponse>(`${this.apiUrl}`, request);
  }

  override createApplicantBootcampContent(id: number): Observable<CreateApplicantBootcampcontentResponse> {
    const loggedInUserId = this.authService.getCurrentUserId();

    if (!loggedInUserId) {
      throw new Error('Kullanıcı oturumu bulunamadı.');
    }
    const applicantBootcamContentRequest: CreateApplicantBootcampcontentRequest = {
      applicantId: loggedInUserId,
      bootcampContentId: id,

    };
    return this.httpClient.post<CreateApplicantBootcampcontentResponse>(`${this.apiUrl}`, applicantBootcamContentRequest)

  }



}
