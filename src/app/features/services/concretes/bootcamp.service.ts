import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { GetbyidBootcampResponse } from '../../models/responses/bootcamp/getbyid-bootcamp-response';
import { environment } from '../../../../environments/environment.development';
import { BootcampListItemDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { DeleteBootcampResponse } from '../../models/responses/bootcamp/delete-bootcamp-response';
import { UpdateBootcampRequest } from '../../models/requests/bootcamp/update-bootcamp-request';
import { UpdateBootcampResponse } from '../../models/responses/bootcamp/update-bootcamp-response';
import { CreateBootcampRequest } from '../../models/requests/bootcamp/create-bootcamp-request';
import { CreateBootcampResponse } from '../../models/responses/bootcamp/create-bootcamp-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {
  private readonly apiUrl:string = `${environment.API_URL}/bootcamps`

  constructor(private http: HttpClient) { super(); }
  
 
  override getList(pageRequest: PageRequest): Observable<BootcampListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.http.get<BootcampListItemDto>(this.apiUrl,{
      params:newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampListItemDto={
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


  delete(id: number): Observable<DeleteBootcampResponse> {
    return this.http.delete<DeleteBootcampResponse>(`apiUrl/delete/` + id);
  }

  update(applicant: UpdateBootcampRequest): Observable<UpdateBootcampResponse> {
    return this.http.put<UpdateBootcampResponse>(`apiUrl/update`, applicant);
  }

  create(applicant: CreateBootcampRequest): Observable<CreateBootcampResponse> {
    return this.http.post<CreateBootcampResponse>(`apiUrl/create`, applicant);
  }

  override getById(bootcampId: number): Observable<GetbyidBootcampResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: bootcampId
    };
  
    return this.http.get<GetbyidBootcampResponse>(`${this.apiUrl}/${bootcampId}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidBootcampResponse = {
          id: response.id,
          name: response.name,
          instructorId: response.instructorId,
          instructorFirstName: response.instructorFirstName,
          instructorLastName: response.instructorLastName,
          bootcampStateId: response.bootcampStateId,
          bootcampStateName: response.bootcampStateName,
          bootcampImageId: response.bootcampImageId,
          bootcampImageImagePath: response.bootcampImageImagePath,
          startDate: response.startDate,
          endDate: response.endDate
        };
        return newResponse;
      })
    );
  }
  

override getListBootcampByInstructorId(pageRequest:PageRequest,instructorId: string): Observable<BootcampListItemDto> {
  const newRequest :{[key:string]:string | number}={
    page:pageRequest.page,
    pageSize:pageRequest.pageSize,
    instructorId:instructorId
};
return this.http.get<BootcampListItemDto>(`${this.apiUrl}/getbootcampbyinstructorid`,{
  params:newRequest
}).pipe(
  map((response)=>{
    const newResponse:BootcampListItemDto={
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

}}
