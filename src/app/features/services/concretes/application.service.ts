import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationBaseService } from '../abstracts/application-base.service';
import { GetlistApplicationResponse } from '../../models/responses/application/getlist-application-response';
import { GetbyidApplicationResponse } from '../../models/responses/application/getbyid-application-response';
import { environment } from '../../../../environments/environment';
import { PageRequest } from '../../../core/models/page-request';
import { ApplicationListItemDto } from '../../models/responses/application/application-list-item-dto';
import { DeleteApplicationResponse } from '../../models/responses/application/delete-application-response';
import { UpdateApplicationRequest } from '../../models/requests/application/update-application-request';
import { UpdateApplicationResponse } from '../../models/responses/application/update-application-response';
import { CreateApplicationRequest } from '../../models/requests/application/create-application-request';
import { CreateApplicationResponse } from '../../models/responses/application/create-application-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicationService extends ApplicationBaseService{

  private readonly apiUrl:string = `${environment.API_URL}/ApplicationEntities`
 
  constructor(private httpClient:HttpClient) {super() }
  
  override getList(pageRequest: PageRequest): Observable<ApplicationListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<ApplicationListItemDto>(this.apiUrl,{
      params:newRequest
    }).pipe(
      map((response)=>{
        const newResponse:ApplicationListItemDto={
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
  
  delete(id: number): Observable<DeleteApplicationResponse> {
    return this.httpClient.delete<DeleteApplicationResponse>( `${this.apiUrl}/`+ id);
  }

  update(application: UpdateApplicationRequest): Observable<UpdateApplicationResponse> {
    return this.httpClient.put<UpdateApplicationResponse>(`${this.apiUrl}`, application);
  }

  create(application: CreateApplicationRequest): Observable<CreateApplicationResponse> {
    return this.httpClient.post<CreateApplicationResponse>(`${this.apiUrl}`, application);
  }

  override getById(applicationId: number): Observable<GetbyidApplicationResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: applicationId
    };
  
    return this.httpClient.get<GetbyidApplicationResponse>(`${this.apiUrl}/${applicationId}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidApplicationResponse = {
          id: response.id,
          applicantId: response.applicantId,
          bootcampId: response.bootcampId,
          applicationStateId: response.applicationStateId
        };
        return newResponse;
      })
    );
  }
}
