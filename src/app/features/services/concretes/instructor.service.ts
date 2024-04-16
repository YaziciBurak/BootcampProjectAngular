import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { GetlistInstructorResponse } from '../../models/responses/instructor/getlist-instructor-response';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';
import { environment } from '../../../../environments/environment';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends InstructorBaseService{

  private readonly apiUrl:string = `${environment.API_URL}/instructors`
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetlistInstructorResponse[]> {
    return this.httpClient.get<GetlistInstructorResponse[]>(this.apiUrl);
  }
  override getById(): Observable<GetbyidInstructorResponse> {
    return this.httpClient.get<GetbyidInstructorResponse>(this.apiUrl);
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
