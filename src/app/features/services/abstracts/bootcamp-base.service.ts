import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistBootcampResponse } from '../../models/responses/bootcamp/getlist-bootcamp-response';
import { GetbyidBootcampResponse } from '../../models/responses/bootcamp/getbyid-bootcamp-response';
import { DeleteBootcampResponse } from '../../models/responses/bootcamp/delete-bootcamp-response';
import { UpdateBootcampRequest } from '../../models/requests/bootcamp/update-bootcamp-request';
import { CreateBootcampRequest } from '../../models/requests/bootcamp/create-bootcamp-request';
import { CreateBootcampResponse } from '../../models/responses/bootcamp/create-bootcamp-response';
import { UpdateBootcampResponse } from '../../models/responses/bootcamp/update-bootcamp-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampListItemDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';

@Injectable()
export abstract class BootcampBaseService {

  abstract getList(pageRequest:PageRequest): Observable<BootcampListItemDto>;
  abstract getById(bootcampId:number):Observable<GetbyidBootcampResponse>;
  abstract delete(id: number): Observable<DeleteBootcampResponse>;
  abstract update(applicant: UpdateBootcampRequest): Observable<UpdateBootcampResponse>;
  abstract create(applicant: CreateBootcampRequest): Observable<CreateBootcampResponse>;
  abstract getListBootcampByInstructorId(pageRequest:PageRequest,instructorId: string):Observable<BootcampListItemDto>;
  
}
