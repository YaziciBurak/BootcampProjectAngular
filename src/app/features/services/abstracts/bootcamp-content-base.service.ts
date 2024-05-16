import { Injectable } from '@angular/core';
import { CreateBootcampcontentRequest } from '../../models/requests/bootcampcontent/create-bootcampcontent-request';
import { CreateBootcampcontentResponse } from '../../models/responses/bootcampcontent/create-bootcampcontent-response';
import { Observable } from 'rxjs';
import { DeleteBootcampcontentResponse } from '../../models/responses/bootcampcontent/delete-bootcampcontent-response';
import { UpdateBootcampcontentRequest } from '../../models/requests/bootcampcontent/update-bootcampcontent-request';
import { UpdateBootcampcontentResponse } from '../../models/responses/bootcampcontent/update-bootcampcontent-response';
import { GetbyidBootcampcontentResponse } from '../../models/responses/bootcampcontent/getbyid-bootcampcontent-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampcontentListItemDto } from '../../models/responses/bootcampcontent/bootcampcontent-list-item-dto';

@Injectable()

export abstract class BootcampContentBaseService {
  abstract create(request:CreateBootcampcontentRequest):Observable<CreateBootcampcontentResponse>;
  abstract delete(id:number):Observable<DeleteBootcampcontentResponse>;
  abstract update(request:UpdateBootcampcontentRequest):Observable<UpdateBootcampcontentResponse>;
  abstract getById(id:number):Observable<GetbyidBootcampcontentResponse>;
  abstract getList(pageRequest:PageRequest):Observable<BootcampcontentListItemDto>;
  abstract getbybootcampId(pageRequest:PageRequest, bootcampId:number ):Observable<BootcampcontentListItemDto>;
}
