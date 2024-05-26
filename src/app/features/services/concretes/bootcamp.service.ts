import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
import { DynamicQuery } from '../../../core/models/dynamic-query';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/bootcamps`

  constructor(private httpClient: HttpClient, private authService: AuthService) { super(); }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Bir hata oluştu';

    if (error.error instanceof ErrorEvent) {
      // Client-side hata
      errorMessage = `Hata: ${error.error.message}`;
    } else {
      // Backend hatası
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 500 && error.error) {
        // Hata mesajını backend'den alınan response'un ilk satırından ayıklayın
        const backendErrorMessage = error.error.split('\n')[0];
        if (backendErrorMessage.includes('BusinessException')) {
          errorMessage = backendErrorMessage.split(': ')[1]; // Sadece hata mesajını al
        }
      } else {
        errorMessage = `Sunucu Hatası: ${error.status}\nMesaj: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }

  override getList(pageRequest: PageRequest): Observable<BootcampListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<BootcampListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: BootcampListItemDto = {
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

  override delete(id: number): Observable<DeleteBootcampResponse> {
    return this.httpClient.delete<DeleteBootcampResponse>(`${this.apiUrl}/` + id)
    .pipe(catchError(this.handleError.bind(this))
    );
  }

  override update(bootcamp: UpdateBootcampRequest): Observable<UpdateBootcampResponse> {
    return this.httpClient.put<UpdateBootcampResponse>(`${this.apiUrl}`, bootcamp)
    .pipe(catchError(this.handleError.bind(this))
    );
  }

  override create(bootcamp: CreateBootcampRequest): Observable<CreateBootcampResponse> {
    return this.httpClient.post<CreateBootcampResponse>(`${this.apiUrl}`, bootcamp).
    pipe(catchError(this.handleError.bind(this))
    );
  }

  override getById(bootcampId: number): Observable<GetbyidBootcampResponse> {
    const loggedInUserId = this.authService.getCurrentUserId();
    if (loggedInUserId === null) {
      return this.httpClient.get<GetbyidBootcampResponse>(`${this.apiUrl}/${bootcampId}`);
    }
    const newRequest: { [key: string]: string | number } = {
      id: bootcampId,
      applicantId: loggedInUserId,
    };
    return this.httpClient.get<GetbyidBootcampResponse>(`${this.apiUrl}/${bootcampId}`, {
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
          bootcampImagePath: response.bootcampImagePath,
          instructorImageId: response.instructorImageId,
          instructorImagePath: response.instructorImagePath,
          detail: response.detail,
          deadline: response.deadline,
          startDate: response.startDate,
          endDate: response.endDate,
          ifApplicantApplied: response.ifApplicantApplied
        };
        return newResponse;
      })
    );
  }
  override getListBootcampByInstructorId(pageRequest: PageRequest, instructorId: string): Observable<BootcampListItemDto> {
    const params = new HttpParams()
      .set('instructorId', instructorId)
      .set('pageIndex', pageRequest.pageIndex.toString())
      .set('pageSize', pageRequest.pageSize.toString());
    return this.httpClient.get<BootcampListItemDto>(`${this.apiUrl}/getbootcampbyinstructorid?${instructorId}`, { params }).pipe(
      map((response) => {
        const newResponse: BootcampListItemDto = {
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
  getListBootcampByDynamic(pageRequest: PageRequest, dynamic: DynamicQuery): Observable<BootcampListItemDto> {
    return this.httpClient.post<BootcampListItemDto>(`${this.apiUrl}/dynamic/`, {
      filter: dynamic.filter,
      sort: dynamic.sort
    }, { params: new HttpParams().set("pageIndex", pageRequest.pageIndex).set("pageSize", pageRequest.pageSize) }).pipe(
      map((response) => {
        const newResponse: BootcampListItemDto = {
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
}
