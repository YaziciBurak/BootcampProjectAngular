import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBootcampimageResponse } from '../../models/responses/bootcampimage/create-bootcampimage-response';
import { DeleteBootcampimageResponse } from '../../models/responses/bootcampimage/delete-bootcampimage-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampimageListItemDto } from '../../models/responses/bootcampimage/bootcampimage-list-item-dto';
import { GetbyidBootcampimageResponse } from '../../models/responses/bootcampimage/getbyid-bootcampimage-response';
import { UpdateBootcampimageResponse } from '../../models/responses/bootcampimage/update-bootcampimage-response';

@Injectable()
export abstract class BootcampImageBaseService {

  abstract create(formData:FormData): Observable<CreateBootcampimageResponse>;
  abstract delete(id:number): Observable<DeleteBootcampimageResponse>;
  abstract getList(pageRequest:PageRequest): Observable<BootcampimageListItemDto>;
  abstract update(formData:FormData):Observable<UpdateBootcampimageResponse>;
  abstract getById(id:number):Observable<GetbyidBootcampimageResponse>;
}
