import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicantBaseService } from '../abstracts/applicant-base.service';
import { GetlistApplicantResponse } from '../../models/responses/applicant/getlist-applicant-response';
import { GetbyidApplicantResponse } from '../../models/responses/applicant/getbyid-applicant-response';
import { CreateApplicantRequest } from '../../models/requests/applicant/create-applicant-request';
import { CreateApplicantResponse } from '../../models/responses/applicant/create-applicant-response';


@Injectable({
  providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {
 apiGetListUrl=""
 apiGetByIdUrl=""
 apiCreateUrl=""

  constructor(private httpClient:HttpClient) {super() }

  override getList():Observable<GetlistApplicantResponse[]> {
    return this.httpClient.get<GetlistApplicantResponse[]>(this.apiGetListUrl);
   }
   override getById(): Observable<GetbyidApplicantResponse> {
    return this.httpClient.get<GetbyidApplicantResponse>(this.apiGetByIdUrl);
   }
   override create(): Observable<CreateApplicantRequest> {
     return this.httpClient.get<CreateApplicantResponse>(this.apiCreateUrl);
   }
   
}

