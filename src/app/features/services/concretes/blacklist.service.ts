import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BlacklistBaseService } from '../abstracts/blacklist-base.service';
import { GetbyidBlacklistResponse } from '../../models/responses/blacklist/getbyid-blacklist-response';
import { environment } from '../../../../environments/environment';
import { PageRequest } from '../../../core/models/page-request';
import { BlackListListItemDto } from '../../models/responses/blacklist/blacklist-list-item-item-dto';
import { CreateBlacklistRequest } from '../../models/requests/blacklist/create-blacklist-request';
import { CreateBlacklistResponse } from '../../models/responses/blacklist/create-blacklist-response';
import { DeleteBlacklistResponse } from '../../models/responses/blacklist/delete-blacklist-response';
import { UpdateBlacklistRequest } from '../../models/requests/blacklist/update-blacklistre-quest';
import { UpdateBlacklistResponse } from '../../models/responses/blacklist/update-blacklist-response';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService extends BlacklistBaseService {

  private readonly apiUrl: string = `${environment.API_URL}/Blacklists`

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

  override getList(pageRequest: PageRequest): Observable<BlackListListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<BlackListListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: BlackListListItemDto = {
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
  override create(request: CreateBlacklistRequest): Observable<CreateBlacklistResponse> {
    return this.httpClient.post<CreateBlacklistResponse>(`${this.apiUrl}`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override delete(id: number): Observable<DeleteBlacklistResponse> {
    return this.httpClient.delete<DeleteBlacklistResponse>(`${this.apiUrl}/` + id)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override update(request: UpdateBlacklistRequest): Observable<UpdateBlacklistResponse> {
    return this.httpClient.put<UpdateBlacklistResponse>(`${this.apiUrl}`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override getById(blacklistId: number): Observable<GetbyidBlacklistResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: blacklistId
    };
    return this.httpClient.get<GetbyidBlacklistResponse>(`${this.apiUrl}/${blacklistId}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidBlacklistResponse = {
          id: response.id,
          applicantId: response.applicantId,
          applicantFirstName: response.applicantFirstName,
          applicantLastName: response.applicantLastName,
          date: response.date,
          reason: response.reason,
        };
        return newResponse;
      })
    );
  }

}
