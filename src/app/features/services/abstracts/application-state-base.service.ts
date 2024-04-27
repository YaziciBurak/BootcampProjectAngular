import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetbyidApplicationstateResponse } from '../../models/responses/applicationstate/getbyid-applicationstate-response'; 
import { GetlistApplicationstateResponse } from '../../models/responses/applicationstate/getlist-applicationstate-response'; 
import { CreateApplicationstateRequest } from '../../models/requests/applicationstate/create-applicationstate-request';
import { CreateApplicationstateResponse } from '../../models/responses/applicationstate/create-applicationstate-response';
import { DeleteApplicationstateResponse } from '../../models/responses/applicationstate/delete-applicationstate-response';
import { PageRequest } from '../../../core/models/page-request';
import { ApplicationstateListItemDto } from '../../models/responses/applicationstate/applicationstate-list-item-dto';
import { UpdateApplicationstateRequest } from '../../models/requests/applicationstate/update-applicationstate-request';
import { UpdateApplicationstateResponse } from '../../models/responses/applicationstate/update-applicationstate-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicationStateBaseService {

  abstract getList(pageRequest:PageRequest):Observable<ApplicationstateListItemDto>;
  abstract getById(applicationStateId:number):Observable<GetbyidApplicationstateResponse>;
  abstract add(request:CreateApplicationstateRequest):Observable<CreateApplicationstateResponse>;
  abstract delete(id:number):Observable<DeleteApplicationstateResponse>;
  abstract update(request:UpdateApplicationstateRequest):Observable<UpdateApplicationstateResponse>
}
