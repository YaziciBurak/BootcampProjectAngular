import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetbyidBootcampstateResponse } from '../../models/responses/bootcampstate/getbyid-bootcampstate-response';
import { CreateBootcampstateRequest } from '../../models/requests/bootcampstate/create-bootcampstate-request';
import { CreateBootcampstateResponse } from '../../models/responses/bootcampstate/create-bootcampstate-resonse';
import { DeleteBootcampstateResponse } from '../../models/responses/bootcampstate/delete-bootcampstate-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampstateListItemDto } from '../../models/responses/bootcampstate/bootcampstate-list-item-dto';
import { UpdateBootcampstateRequest } from '../../models/requests/bootcampstate/update-bootcampstate-request';
import { UpdateBootcampstateResponse } from '../../models/responses/bootcampstate/update-bootcampstate-response';

@Injectable()
export abstract class BootcampStateBaseService {

  abstract getList(pageRequest:PageRequest):Observable<BootcampstateListItemDto>
  abstract getById(bootcampStateId:number):Observable<GetbyidBootcampstateResponse>;
  abstract add(request:CreateBootcampstateRequest):Observable<CreateBootcampstateResponse>
  abstract delete(id:number):Observable<DeleteBootcampstateResponse>
  abstract update(request:UpdateBootcampstateRequest):Observable<UpdateBootcampstateResponse>
}
