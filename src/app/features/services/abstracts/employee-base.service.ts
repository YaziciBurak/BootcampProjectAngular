import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistEmployeeResponse } from '../../models/responses/employee/getlist-employee-response';
import { GetbyidEmployeeResponse } from '../../models/responses/employee/getbyid-employee-response';
import { EmployeeForRegisterRequest } from '../../models/requests/users/employee-for-register-request';
import { UserForRegisterResponse } from '../../models/responses/users/user-for-register-response';
import { DeleteEmployeeResponse } from '../../models/responses/employee/delete-employee-response';
import { UpdateEmployeeRequest } from '../../models/requests/employee/update-employeere-quest';
import { UpdateEmployeeResponse } from '../../models/responses/employee/update-employee-response';
import { EmployeeListItemDto } from '../../models/responses/employee/employee-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';

@Injectable()
export abstract class EmployeeBaseService {

  abstract getList(pageRequest:PageRequest):Observable<EmployeeListItemDto>;
  abstract getById(id:string):Observable<GetbyidEmployeeResponse>;
  abstract add(request:EmployeeForRegisterRequest):Observable<UserForRegisterResponse>
  abstract delete(id:string):Observable<DeleteEmployeeResponse>
  abstract update(request:UpdateEmployeeRequest):Observable<UpdateEmployeeResponse>
  abstract getListAll():Observable<EmployeeListItemDto>;
  
}
