import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistInstructorResponse } from '../../models/responses/instructor/getlist-instructor-response';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';

@Injectable()
export abstract class InstructorBaseService {

 abstract getList():Observable<GetlistInstructorResponse[]>;
 abstract getById():Observable<GetbyidInstructorResponse>;
 abstract getListAll():Observable<InstructorListItemDto>;
}
