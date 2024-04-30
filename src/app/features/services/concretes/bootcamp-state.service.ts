import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampStateBaseService } from '../abstracts/bootcamp-state-base.service';
import { GetlistBootcampstateResponse } from '../../models/responses/bootcampstate/getlist-bootcampstate-response';
import { environment } from '../../../../environments/environment.development';
import { CreateBootcampstateRequest } from '../../models/requests/bootcampstate/create-bootcampstate-request';
import { CreateBootcampstateResponse } from '../../models/responses/bootcampstate/create-bootcampstate-resonse';
import { DeleteBootcampstateResponse } from '../../models/responses/bootcampstate/delete-bootcampstate-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampstateListItemDto } from '../../models/responses/bootcampstate/bootcampstate-list-item-dto';
import { UpdateBootcampstateRequest } from '../../models/requests/bootcampstate/update-bootcampstate-request';
import { UpdateBootcampstateResponse } from '../../models/responses/bootcampstate/update-bootcampstate-response';
import { GetbyidBootcampstateResponse } from '../../models/responses/bootcampstate/getbyid-bootcampstate-response';


@Injectable({
  providedIn: 'root'
})
export class BootcampStateService extends BootcampStateBaseService{

  private readonly apiUrl:string = `${environment.API_URL}/BootcampStates`

  constructor(private httpClient:HttpClient) {super() }

  override getList(pageRequest: PageRequest): Observable<BootcampstateListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<BootcampstateListItemDto>(this.apiUrl,{
      params:newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampstateListItemDto={
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
  override add(request: CreateBootcampstateRequest): Observable<CreateBootcampstateResponse> {
    return this.httpClient.post<CreateBootcampstateResponse>(this.apiUrl, request);
  }
  override delete(id: number): Observable<DeleteBootcampstateResponse> {
    return this.httpClient.delete<DeleteBootcampstateResponse>(`${this.apiUrl}/`+id)
  }
   override update(request: UpdateBootcampstateRequest): Observable<UpdateBootcampstateResponse> {
    return this.httpClient.put<UpdateBootcampstateResponse>(`${this.apiUrl}`, request);
  }

  override getById(id: number): Observable<GetbyidBootcampstateResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: id
    };
    return this.httpClient.get<GetbyidBootcampstateResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidBootcampstateResponse = {
          id: response.id,
          name: response.name,
        };
        return newResponse;
      })
    );
  }
  override getListAll(): Observable<BootcampstateListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      page: 0,
      pageSize: 100
    };

    return this.httpClient.get<BootcampstateListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampstateListItemDto={
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
