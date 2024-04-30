import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { GetlistInstructorResponse } from '../../models/responses/instructor/getlist-instructor-response';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';
import { environment } from '../../../../environments/environment';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends InstructorBaseService{

  private readonly apiUrl:string = `${environment.API_URL}/instructors`
  
  
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
  
  override getById(instructorId: string): Observable<GetbyidInstructorResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: instructorId
    };
  
    return this.httpClient.get<GetbyidInstructorResponse>(`${this.apiUrl}/${instructorId}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidInstructorResponse = {
          id: response.id,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          companyName: response.companyName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity: response.nationalIdentity,
          email: response.email,
          password: response.password,
          updatedDate: response.updatedDate
        };
        return newResponse;
      })
    );
  }
}
