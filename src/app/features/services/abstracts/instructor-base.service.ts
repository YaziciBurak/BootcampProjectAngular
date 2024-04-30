import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistInstructorResponse } from '../../models/responses/instructor/getlist-instructor-response';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';

@Injectable()
export abstract class InstructorBaseService {

 abstract getList(pageRequest:PageRequest):Observable<InstructorListItemDto>;
 abstract getById(instructorId:string):Observable<GetbyidInstructorResponse>;
 abstract getListAll():Observable<InstructorListItemDto>;
}
