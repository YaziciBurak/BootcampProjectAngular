import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistApplicantResponse } from '../../models/responses/applicant/getlist-applicant-response';
import { GetbyidApplicantResponse } from '../../models/responses/applicant/getbyid-applicant-response';
import { CreateApplicantRequest } from '../../models/requests/applicant/create-applicant-request';


@Injectable()
export abstract class ApplicantBaseService {

  abstract getList():Observable<GetlistApplicantResponse[]>;
  abstract getById():Observable<GetbyidApplicantResponse>;
  abstract create():Observable<CreateApplicantRequest>;
}
