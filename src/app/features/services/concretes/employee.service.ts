import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeBaseService } from '../abstracts/employee-base.service';
import { GetlistEmployeeResponse } from '../../models/responses/employee/getlist-employee-response';
import { GetbyidEmployeeResponse } from '../../models/responses/employee/getbyid-employee-response';
import { environment } from '../../../../environments/environment';
import { PageRequest } from '../../../core/models/page-request';
import { EmployeeListItemDto } from '../../models/responses/employee/employee-list-item-dto';
import { UpdateEmployeeRequest } from '../../models/requests/employee/update-employeere-quest';
import { EmployeeForRegisterRequest } from '../../models/requests/users/employee-for-register-request';
import { DeleteEmployeeResponse } from '../../models/responses/employee/delete-employee-response';
import { UpdateEmployeeResponse } from '../../models/responses/employee/update-employee-response';
import { UserForRegisterResponse } from '../../models/responses/users/user-for-register-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EmployeeBaseService {

  private readonly apiUrl: string = `${environment.API_URL}/Employees`
  private readonly apiUrlAuth: string = `${environment.API_URL}/Auth`

  constructor(private httpClient: HttpClient) { super() }

  override getList(pageRequest: PageRequest): Observable<EmployeeListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<EmployeeListItemDto>(this.apiUrl,
      {
        params: newRequest
      }).pipe(
        map((response) => {
          const newResponse: EmployeeListItemDto = {
            index: pageRequest.pageIndex,
            size: pageRequest.pageSize,
            count: response.count,
            hasNext: response.hasNext,
            hasPrevious: response.hasPrevious,
            items: response.items,
            pages: response.pages
          };
          return newResponse;
        })
      )
  }

  override getById(id: string): Observable<GetbyidEmployeeResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: id
    };
    return this.httpClient.get<GetbyidEmployeeResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidEmployeeResponse = {
          id: response.id,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          nationalIdentity: response.nationalIdentity,
          email: response.email,
          password: response.password,
          position: response.position,
          dateOfBirth: response.dateOfBirth,
          updatedDate: response.updatedDate
        };
        return newResponse;
      })
    );
  }
  override create(request: EmployeeForRegisterRequest): Observable<UserForRegisterResponse> {
    return this.httpClient.post<UserForRegisterResponse>(`${this.apiUrlAuth}/RegisterEmployee`, request);
  }
  override delete(id: string): Observable<DeleteEmployeeResponse> {
    return this.httpClient.delete<DeleteEmployeeResponse>(`${this.apiUrl}/` + id);
  }
  override update(request: UpdateEmployeeRequest): Observable<UpdateEmployeeResponse> {
    return this.httpClient.put<UpdateEmployeeResponse>(`${this.apiUrl}`, request);
  }
  override getListAll(): Observable<EmployeeListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: 0,
      pageSize: 100
    };
    return this.httpClient.get<EmployeeListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: EmployeeListItemDto = {
          index: 0,
          size: 100,
          count: response.count,
          hasNext: response.hasNext,
          hasPrevious: response.hasPrevious,
          items: response.items,
          pages: response.pages
        };
        return newResponse;
      })
    )
  }

}
