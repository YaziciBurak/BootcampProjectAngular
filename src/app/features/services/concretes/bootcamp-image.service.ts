import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampImageBaseService } from '../abstracts/bootcamp-image-base.service';
import { environment } from '../../../../environments/environment';
import { CreateBootcampimageResponse } from '../../models/responses/bootcampimage/create-bootcampimage-response';
import { DeleteBootcampimageResponse } from '../../models/responses/bootcampimage/delete-bootcampimage-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampimageListItemDto } from '../../models/responses/bootcampimage/bootcampimage-list-item-dto';
import { GetbyidBootcampimageResponse } from '../../models/responses/bootcampimage/getbyid-bootcampimage-response';
import { UpdateBootcampimageResponse } from '../../models/responses/bootcampimage/update-bootcampimage-response';


@Injectable({
  providedIn: 'root'
})
export class BootcampImageService extends BootcampImageBaseService {

  private readonly apiUrl:string = `${environment.API_URL}/BootcampImages`

  constructor(private httpClient:HttpClient) {super() }
  
  override create(formData: FormData): Observable<CreateBootcampimageResponse> {
   return this.httpClient.post<CreateBootcampimageResponse>(`${this.apiUrl}`, formData);
  }
  override update(formData: FormData): Observable<UpdateBootcampimageResponse> {
  return this.httpClient.put<UpdateBootcampimageResponse>(`${this.apiUrl}`, formData);  
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
  override getById(id: number): Observable<GetbyidBootcampimageResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: id
    };
    return this.httpClient.get<GetbyidBootcampimageResponse>(`${this.apiUrl}/${id}`,  {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidBootcampimageResponse = {
          id: response.id,
          bootcampId: response.bootcampId,
          imagePath: response.imagePath,
        };
        return newResponse;
      })
    );
  }
}
