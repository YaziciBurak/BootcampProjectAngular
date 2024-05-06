import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistApplicationResponse } from '../../models/responses/application/getlist-application-response';
import { GetbyidApplicationResponse } from '../../models/responses/application/getbyid-application-response';
import { ApplicationListItemDto } from '../../models/responses/application/application-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { UpdateApplicationRequest } from '../../models/requests/application/update-application-request';
import { UpdateApplicationResponse } from '../../models/responses/application/update-application-response';
import { DeleteApplicationResponse } from '../../models/responses/application/delete-application-response';
import { CreateApplicationRequest } from '../../models/requests/application/create-application-request';
import { CreateApplicationResponse } from '../../models/responses/application/create-application-response';

@Injectable()
export abstract class ApplicationBaseService {

  abstract getList(pageRequest:PageRequest):Observable<ApplicationListItemDto>;
  abstract getById(id:number):Observable<GetbyidApplicationResponse>;
  abstract update(request:UpdateApplicationRequest):Observable<UpdateApplicationResponse>;
  abstract delete(id:number):Observable<DeleteApplicationResponse>;
  abstract create(request:CreateApplicationRequest):Observable<CreateApplicationResponse>
}
