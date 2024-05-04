import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistInstructorResponse } from '../../models/responses/instructor/getlist-instructor-response';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { InstructorForRegisterRequest } from '../../models/requests/users/instructor-for-register-request';
import { UserForRegisterResponse } from '../../models/responses/users/user-for-register-response';
import { DeleteInstructorResponse } from '../../models/responses/instructor/delete-instructor-response';
import { UpdateInstructorRequest } from '../../models/requests/instructor/update-instructor-request';
import { UpdateInstructorResponse } from '../../models/responses/instructor/update-instructor-response';

@Injectable()
export abstract class InstructorBaseService {

    abstract getList(pageRequest:PageRequest):Observable<InstructorListItemDto>;
    abstract getById(id:string):Observable<GetbyidInstructorResponse>;
    abstract create(request:InstructorForRegisterRequest):Observable<UserForRegisterResponse>
    abstract delete(id:string):Observable<DeleteInstructorResponse>
    abstract update(request:UpdateInstructorRequest):Observable<UpdateInstructorResponse>
    abstract getListAll():Observable<InstructorListItemDto>;
}
