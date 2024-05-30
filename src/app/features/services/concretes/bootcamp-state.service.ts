import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
export class BootcampStateService extends BootcampStateBaseService {

  private readonly apiUrl: string = `${environment.API_URL}/BootcampStates`

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

  override getList(pageRequest: PageRequest): Observable<BootcampstateListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<BootcampstateListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: BootcampstateListItemDto = {
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
  override create(request: CreateBootcampstateRequest): Observable<CreateBootcampstateResponse> {
    return this.httpClient.post<CreateBootcampstateResponse>(this.apiUrl, request)
    .pipe(catchError(this.handleError.bind(this))
      );
  }
  
  override delete(id: number): Observable<DeleteBootcampstateResponse> {
    return this.httpClient.delete<DeleteBootcampstateResponse>(`${this.apiUrl}/` + id)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override update(request: UpdateBootcampstateRequest): Observable<UpdateBootcampstateResponse> {
    return this.httpClient.put<UpdateBootcampstateResponse>(`${this.apiUrl}`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override getById(id: number): Observable<GetbyidBootcampstateResponse> {
    const newRequest: { [key: string]: string | number } = {
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
    const newRequest: { [key: string]: string | number } = {
      pageIndex: 0,
      pageSize: 100
    };

    return this.httpClient.get<BootcampstateListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: BootcampstateListItemDto = {
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
