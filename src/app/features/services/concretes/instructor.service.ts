import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';
import { environment } from '../../../../environments/environment';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { InstructorForRegisterRequest } from '../../models/requests/users/instructor-for-register-request';
import { UserForRegisterResponse } from '../../models/responses/users/user-for-register-response';
import { DeleteInstructorResponse } from '../../models/responses/instructor/delete-instructor-response';
import { UpdateInstructorRequest } from '../../models/requests/instructor/update-instructor-request';
import { UpdateInstructorResponse } from '../../models/responses/instructor/update-instructor-response';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends InstructorBaseService {

  private readonly apiUrl: string = `${environment.API_URL}/Instructors`
  private readonly apiUrlAuth: string = `${environment.API_URL}/Auth`


  constructor(private httpClient: HttpClient) { super() }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Bir hata oluştu';
    if (error.error instanceof ErrorEvent) {
        // Client-side hata
        errorMessage = `Hata: ${error.error.message}`;
    } else {
        // Backend hatası
        if (error.status === 0) {
            errorMessage = 'Sunucuya ulaşılamadı. Lütfen ağ bağlantınızı kontrol edin veya daha sonra tekrar deneyin.';
        } else if (error.error && typeof error.error === 'object' && error.error.detail) {
            // Hata mesajını backend'den alınan response'un 'detail' alanından alın
            errorMessage = error.error.detail;
        } else {
            errorMessage = `Sunucu Hatası: ${error.status}\nMesaj: ${error.message}`;
        }
    }
    return throwError(errorMessage);
  }

  override getList(pageRequest: PageRequest): Observable<InstructorListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<InstructorListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: InstructorListItemDto = {
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
  override getById(id: string): Observable<GetbyidInstructorResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: id
    };
    return this.httpClient.get<GetbyidInstructorResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidInstructorResponse = {
          id: response.id,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          nationalIdentity: response.nationalIdentity,
          email: response.email,
          password: response.password,
          companyName: response.companyName,
          dateOfBirth: response.dateOfBirth,
          updatedDate: response.updatedDate
        };
        return newResponse;
      })
    );
  }
  override create(request: InstructorForRegisterRequest): Observable<UserForRegisterResponse> {
    return this.httpClient.post<UserForRegisterResponse>(`${this.apiUrlAuth}/RegisterInstructor`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override delete(id: string): Observable<DeleteInstructorResponse> {
    return this.httpClient.delete<DeleteInstructorResponse>(`${this.apiUrl}/` + id)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override update(request: UpdateInstructorRequest): Observable<UpdateInstructorResponse> {
    return this.httpClient.put<UpdateInstructorResponse>(`${this.apiUrl}`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override getListAll(): Observable<InstructorListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: 0,
      pageSize: 100
    };
    return this.httpClient.get<InstructorListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: InstructorListItemDto = {
          index: 0,
          size: 100,
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