import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/page-request';
import { CreateInstructorimageResponse } from '../../models/responses/instructorimage/create-instructorimage-response';
import { Observable } from 'rxjs';
import { DeleteInstructorimageResponse } from '../../models/responses/instructorimage/delete-instructorimage-response';
import { InstructorimageListItemDto } from '../../models/responses/instructorimage/instructorimage-list-item-dto';
import { UpdateInstructorimageResponse } from '../../models/responses/instructorimage/update-instructorimage-response';
import { GetbyidInstructorimageResponse } from '../../models/responses/instructorimage/getbyid-instructorimage-response';

@Injectable()
export abstract class InstructorImageBaseService {

  abstract create(formData:FormData): Observable<CreateInstructorimageResponse>;
  abstract delete(id:number): Observable<DeleteInstructorimageResponse>;
  abstract getList(pageRequest:PageRequest): Observable<InstructorimageListItemDto>;
  abstract update(formData:FormData):Observable<UpdateInstructorimageResponse>;
  abstract getById(id:number):Observable<GetbyidInstructorimageResponse>;
}
