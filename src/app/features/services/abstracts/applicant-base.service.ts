import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { GetbyidApplicantResponse } from '../../models/responses/applicant/getbyid-applicant-response';
import { UpdateApplicantRequest } from '../../models/requests/applicant/update-applicant-request';
import { UpdateApplicantResponse } from '../../models/responses/applicant/update-applicant-response';
import { ApplicantListItemDto } from '../../models/responses/applicant/applicant-list-item-dto';
import { DeleteApplicantResponse } from '../../models/responses/applicant/delete-applicant-response';
import { UpdateApplicantPasswordRequest } from '../../models/requests/applicant/update-applicant-password-request';
import { UpdateApplicantPasswordResponse } from '../../models/responses/applicant/update-applicant-password-response';


@Injectable()
export abstract class ApplicantBaseService {

  abstract getList(pageRequest:PageRequest):Observable<ApplicantListItemDto>;
  abstract getById(id:string):Observable<GetbyidApplicantResponse>;
  abstract update(request:UpdateApplicantRequest):Observable<UpdateApplicantResponse>;
  abstract delete(id:string):Observable<DeleteApplicantResponse>;
  abstract updatePassword(request:UpdateApplicantPasswordRequest):Observable<UpdateApplicantPasswordResponse>;
}
