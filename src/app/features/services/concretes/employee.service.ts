import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeBaseService } from '../abstracts/employee-base.service';
import { GetlistEmployeeResponse } from '../../models/responses/employee/getlist-employee-response';
import { GetbyidEmployeeResponse } from '../../models/responses/employee/getbyid-employee-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EmployeeBaseService{

  apiGetListUrl=""
  apiGetByIdUrl=""

  constructor(private httpClient:HttpClient) {super() }
  override getList(): Observable<GetlistEmployeeResponse[]> {
    return this.httpClient.get<GetlistEmployeeResponse[]>(this.apiGetListUrl);
  }
  override getById(): Observable<GetbyidEmployeeResponse> {
    return this.httpClient.get<GetbyidEmployeeResponse>(this.apiGetByIdUrl);
  }
}
