import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';
import { environment } from '../../../../environments/environment';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { InstructorForRegisterRequest } from '../../models/requests/users/instructor-for-register-request';
import { UserForRegisterResponse } from '../../models/responses/users/user-for-register-response';
import { DeleteInstructorResponse } from '../../models/responses/instructor/delete-instructor-response';
import { UpdateInstructorRequest } from '../../models/requests/instructor/update-instructor-request';
import { UpdateInstructorResponse } from '../../models/responses/instructor/update-instructor-response';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends InstructorBaseService{

  private readonly apiUrl:string = `${environment.API_URL}/Instructors`
  private readonly apiUrlAuth:string = `${environment.API_URL}/Auth`
  
  
  constructor(private httpClient:HttpClient) {super() }

  override getList(pageRequest: PageRequest): Observable<InstructorListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<InstructorListItemDto>(this.apiUrl,{
      params:newRequest
    }).pipe(
      map((response)=>{
        const newResponse:InstructorListItemDto={
          index:pageRequest.page,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
          pages:response.pages
        };
        return newResponse;
      })
    )
  }
  override getById(id: string): Observable<GetbyidInstructorResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: id
    };
    return this.httpClient.get<GetbyidInstructorResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidInstructorResponse = {
          id: response.id,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          nationalIdentity: response.nationalIdentity,
          email: response.email,
          password: response.password,
          companyName: response.companyName,
          dateOfBirth: response.dateOfBirth,
          updatedDate: response.updatedDate
        };
        return newResponse;
      })
    );
  }
  override add(request: InstructorForRegisterRequest): Observable<UserForRegisterResponse> {
    return this.httpClient.post<UserForRegisterResponse>(`${this.apiUrlAuth}/RegisterInstructor`, request);
  }
  override delete(id: string): Observable<DeleteInstructorResponse> {
    return this.httpClient.delete<DeleteInstructorResponse>( `${this.apiUrl}/`+ id);
  }
  override update(request: UpdateInstructorRequest): Observable<UpdateInstructorResponse> {
    return this.httpClient.put<UpdateInstructorResponse>(`${this.apiUrl}`, request);
  }
  
  override getListAll(): Observable<InstructorListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      page: 0,
      pageSize: 100
    };

    return this.httpClient.get<InstructorListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:InstructorListItemDto={
          index:0,
          size:100,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
          pages:response.pages
        };
        return newResponse;
      })
    )
  }
  
}