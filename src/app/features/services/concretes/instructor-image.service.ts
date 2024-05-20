import { Injectable } from '@angular/core';
import { InstructorImageBaseService } from '../abstracts/instructor-image-base.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CreateInstructorimageResponse } from '../../models/responses/instructorimage/create-instructorimage-response';
import { UpdateInstructorimageResponse } from '../../models/responses/instructorimage/update-instructorimage-response';
import { DeleteInstructorimageResponse } from '../../models/responses/instructorimage/delete-instructorimage-response';
import { PageRequest } from '../../../core/models/page-request';
import { InstructorimageListItemDto } from '../../models/responses/instructorimage/instructorimage-list-item-dto';
import { GetbyidInstructorimageResponse } from '../../models/responses/instructorimage/getbyid-instructorimage-response';

@Injectable({
  providedIn: 'root'
})
export class InstructorImageService extends InstructorImageBaseService {

  private readonly apiUrl: string = `${environment.API_URL}/InstructorImages`
  constructor(private httpClient: HttpClient) { super() }

  override create(formData: FormData): Observable<CreateInstructorimageResponse> {
    return this.httpClient.post<CreateInstructorimageResponse>(`${this.apiUrl}`, formData);
  }
  override update(formData: FormData): Observable<UpdateInstructorimageResponse> {
    return this.httpClient.put<UpdateInstructorimageResponse>(`${this.apiUrl}`, formData);
  }
  override delete(id: number): Observable<DeleteInstructorimageResponse> {
    return this.httpClient.delete<DeleteInstructorimageResponse>(`${this.apiUrl}/` + id);
  }

  override getList(pageRequest: PageRequest): Observable<InstructorimageListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<InstructorimageListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: InstructorimageListItemDto = {
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
  override getById(id: number): Observable<GetbyidInstructorimageResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: id
    };
    return this.httpClient.get<GetbyidInstructorimageResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidInstructorimageResponse = {
          id: response.id,
          instructorId: response.instructorId,
          instructorFirstName: response.instructorFirstName,
          instructorLastName: response.instructorLastName,
          imagePath: response.imagePath
        };
        return newResponse;
      })
    );
  }
}
