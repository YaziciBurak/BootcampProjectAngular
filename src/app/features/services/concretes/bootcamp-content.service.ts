import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BootcampContentBaseService } from '../abstracts/bootcamp-content-base.service';
import { HttpClient } from '@angular/common/http';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampcontentListItemDto } from '../../models/responses/bootcampcontent/bootcampcontent-list-item-dto';
import { Observable, map } from 'rxjs';
import { GetbyidBootcampcontentResponse } from '../../models/responses/bootcampcontent/getbyid-bootcampcontent-response';
import { CreateBootcampcontentRequest } from '../../models/requests/bootcampcontent/create-bootcampcontent-request';
import { CreateBootcampcontentResponse } from '../../models/responses/bootcampcontent/create-bootcampcontent-response';
import { DeleteBootcampcontentResponse } from '../../models/responses/bootcampcontent/delete-bootcampcontent-response';
import { UpdateBootcampcontentRequest } from '../../models/requests/bootcampcontent/update-bootcampcontent-request';
import { UpdateBootcampcontentResponse } from '../../models/responses/bootcampcontent/update-bootcampcontent-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampContentService extends BootcampContentBaseService{
  private readonly apiUrl:string = `${environment.API_URL}/BootcampContents`
  constructor(private httpClient:HttpClient) {super() }

  override getList(pageRequest: PageRequest): Observable<BootcampcontentListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    
    return this.httpClient.get<BootcampcontentListItemDto>(this.apiUrl,
    {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampcontentListItemDto={
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

  override getById(id: number): Observable<GetbyidBootcampcontentResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: id
    };
    return this.httpClient.get<GetbyidBootcampcontentResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidBootcampcontentResponse = {
          id: response.id,
          bootcampId: response.bootcampId,
          videoUrl: response.videoUrl,
          content: response.content
        };
        return newResponse;
      })
    );
  }
  override create(request: CreateBootcampcontentRequest): Observable<CreateBootcampcontentResponse> {
    return this.httpClient.post<CreateBootcampcontentResponse>(`${this.apiUrl}`, request);
  }
  override delete(id: number): Observable<DeleteBootcampcontentResponse> {
    return this.httpClient.delete<DeleteBootcampcontentResponse>( `${this.apiUrl}/`+ id);
  }
  override update(request: UpdateBootcampcontentRequest): Observable<UpdateBootcampcontentResponse> {
    return this.httpClient.put<UpdateBootcampcontentResponse>(`${this.apiUrl}`, request);
  }
}
