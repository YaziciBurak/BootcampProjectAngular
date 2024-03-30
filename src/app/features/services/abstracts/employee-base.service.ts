import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistEmployeeResponse } from '../../models/responses/employee/getlist-employee-response';
import { GetbyidEmployeeResponse } from '../../models/responses/employee/getbyid-employee-response';

@Injectable()
export abstract class EmployeeBaseService {

  abstract getList():Observable<GetlistEmployeeResponse[]>;
  abstract getById():Observable<GetbyidEmployeeResponse>;
}
