import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampImageBaseService } from '../abstracts/bootcamp-image-base.service';
import { environment } from '../../../../environments/environment';
import { CreateBootcampimageRequest } from '../../models/requests/bootcampimage/create-bootcampimage-request';
import { CreateBootcampimageResponse } from '../../models/responses/bootcampimage/create-bootcampimage-response';
import { DeleteBootcampimageResponse } from '../../models/responses/bootcampimage/delete-bootcampimage-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampimageListItemDto } from '../../models/responses/bootcampimage/bootcampimage-list-item-dto';


@Injectable({
  providedIn: 'root'
})
export class BootcampImageService extends BootcampImageBaseService {

  private readonly apiUrl:string = `${environment.API_URL}/BootcampImages`

  constructor(private httpClient:HttpClient) {super() }
  
  override create(formData: FormData): Observable<CreateBootcampimageResponse> {
   return this.httpClient.post<CreateBootcampimageResponse>(`${this.apiUrl}`, formData);
  }
 
  override delete(id: number): Observable<DeleteBootcampimageResponse> {
    return this.httpClient.delete<DeleteBootcampimageResponse>(`${this.apiUrl}/`+ id);
   }

   override getList(pageRequest: PageRequest): Observable<BootcampimageListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<BootcampimageListItemDto>(this.apiUrl,{
      params:newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampimageListItemDto={
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
}
