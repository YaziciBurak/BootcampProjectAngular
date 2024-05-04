import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBootcampimageRequest } from '../../models/requests/bootcampimage/create-bootcampimage-request';
import { CreateBootcampimageResponse } from '../../models/responses/bootcampimage/create-bootcampimage-response';
import { DeleteBootcampimageResponse } from '../../models/responses/bootcampimage/delete-bootcampimage-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampimageListItemDto } from '../../models/responses/bootcampimage/bootcampimage-list-item-dto';

@Injectable()
export abstract class BootcampImageBaseService {

  abstract create(request:CreateBootcampimageRequest): Observable<CreateBootcampimageResponse>;
  abstract delete(id:number): Observable<DeleteBootcampimageResponse>;
  abstract getList(pageRequest:PageRequest): Observable<BootcampimageListItemDto>;
}
