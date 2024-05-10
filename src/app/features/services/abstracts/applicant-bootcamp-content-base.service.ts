import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/page-request';
import { Observable } from 'rxjs';
import { CreateApplicantBootcampcontentRequest } from '../../models/requests/applicantbootcampcontent/create-applicant-bootcampcontent-request';
import { CreateApplicantBootcampcontentResponse } from '../../models/responses/applicantbootcampcontent/create-applicant-bootcampcontent-response';
import { UpdateApplicantBootcampcontentRequest } from '../../models/requests/applicantbootcampcontent/update-applicant-bootcampcontent-request';
import { UpdateApplicantBootcampcontentResponse } from '../../models/responses/applicantbootcampcontent/update-applicant-bootcampcontent-response';
import { DeleteApplicantBootcampcontentResponse } from '../../models/responses/applicantbootcampcontent/delete-applicant-bootcampcontent-response';
import { GetbyidApplicantBootcampcontentResponse } from '../../models/responses/applicantbootcampcontent/getbyid-applicant-bootcampcontent-response';
import { ApplicantBootcampcontentListItemDto } from '../../models/responses/applicantbootcampcontent/applicant-bootcampcontent-list-item-dto';

@Injectable()
export abstract class ApplicantBootcampContentBaseService {
  abstract create(request:CreateApplicantBootcampcontentRequest):Observable<CreateApplicantBootcampcontentResponse>;
  abstract update(request:UpdateApplicantBootcampcontentRequest):Observable<UpdateApplicantBootcampcontentResponse>;
  abstract delete(id:number):Observable<DeleteApplicantBootcampcontentResponse>;
  abstract getById(id:number):Observable<GetbyidApplicantBootcampcontentResponse>;
  abstract getList(pageRequest:PageRequest):Observable<ApplicantBootcampcontentListItemDto>;
}
