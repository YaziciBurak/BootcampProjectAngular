import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicantBaseService } from '../abstracts/applicant-base.service';
import { environment } from '../../../../environments/environment.development';
import { PageRequest } from '../../../core/models/page-request';
import { ApplicantListItemDto } from '../../models/responses/applicant/applicant-list-item-dto';
import { GetbyidApplicantResponse } from '../../models/responses/applicant/getbyid-applicant-response';
import { UpdateApplicantRequest } from '../../models/requests/applicant/update-applicant-request';
import { UpdateApplicantResponse } from '../../models/responses/applicant/update-applicant-response';
import { DeleteApplicantResponse } from '../../models/responses/applicant/delete-applicant-response';
import { UpdateApplicantPasswordRequest } from '../../models/requests/applicant/update-applicant-password-request';
import { UpdateApplicantPasswordResponse } from '../../models/responses/applicant/update-applicant-password-response';


@Injectable({
  providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/Applicants`

  constructor(private httpClient: HttpClient) { super() }


  override update(request: UpdateApplicantRequest): Observable<UpdateApplicantResponse> {
    return this.httpClient.put<UpdateApplicantResponse>(`${this.apiUrl}`, request);
  }
  override delete(id: string): Observable<DeleteApplicantResponse> {
    return this.httpClient.delete<DeleteApplicantResponse>(`${this.apiUrl}/` + id)
  }
  override updatePassword(request: UpdateApplicantPasswordRequest): Observable<UpdateApplicantPasswordResponse> {
    return this.httpClient.put<UpdateApplicantPasswordResponse>(`${this.apiUrl}/Password`, request);
  }
  override getList(pageRequest: PageRequest): Observable<ApplicantListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<ApplicantListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: ApplicantListItemDto = {
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
  override getById(id: string): Observable<GetbyidApplicantResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: id
    };
    return this.httpClient.get<GetbyidApplicantResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidApplicantResponse = {
          id: response.id,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          about: response.about,
          dateOfBirth: response.dateOfBirth,
          email: response.email,
          nationalIdentity: response.nationalIdentity,
          password: response.password,
          updatedDate: response.updatedDate
        };
        return newResponse;
      })
    );
  }
}

