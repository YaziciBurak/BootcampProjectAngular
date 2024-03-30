import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistInstructorResponse } from '../../models/responses/instructor/getlist-instructor-response';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';

@Injectable()
export abstract class InstructorBaseService {

 abstract getList():Observable<GetlistInstructorResponse[]>;
 abstract getById():Observable<GetbyidInstructorResponse>;
}
