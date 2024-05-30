import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BootcampContentBaseService } from '../abstracts/bootcamp-content-base.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampcontentListItemDto } from '../../models/responses/bootcampcontent/bootcampcontent-list-item-dto';
import { Observable, catchError, map, throwError } from 'rxjs';
import { GetbyidBootcampcontentResponse } from '../../models/responses/bootcampcontent/getbyid-bootcampcontent-response';
import { CreateBootcampcontentRequest } from '../../models/requests/bootcampcontent/create-bootcampcontent-request';
import { CreateBootcampcontentResponse } from '../../models/responses/bootcampcontent/create-bootcampcontent-response';
import { DeleteBootcampcontentResponse } from '../../models/responses/bootcampcontent/delete-bootcampcontent-response';
import { UpdateBootcampcontentRequest } from '../../models/requests/bootcampcontent/update-bootcampcontent-request';
import { UpdateBootcampcontentResponse } from '../../models/responses/bootcampcontent/update-bootcampcontent-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampContentService extends BootcampContentBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/BootcampContents`
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

  override getList(pageRequest: PageRequest): Observable<BootcampcontentListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<BootcampcontentListItemDto>(this.apiUrl,
      {
        params: newRequest
      }).pipe(
        map((response) => {
          const newResponse: BootcampcontentListItemDto = {
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

  override getById(id: number): Observable<GetbyidBootcampcontentResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: id
    };
    return this.httpClient.get<GetbyidBootcampcontentResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidBootcampcontentResponse = {
          id: response.id,
          bootcampId: response.bootcampId,
          bootcampName: response.bootcampName,
          videoUrl: response.videoUrl,
          content: response.content
        };
        return newResponse;
      })
    );
  }
  override create(request: CreateBootcampcontentRequest): Observable<CreateBootcampcontentResponse> {
    return this.httpClient.post<CreateBootcampcontentResponse>(`${this.apiUrl}`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override delete(id: number): Observable<DeleteBootcampcontentResponse> {
    return this.httpClient.delete<DeleteBootcampcontentResponse>(`${this.apiUrl}/` + id)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override update(request: UpdateBootcampcontentRequest): Observable<UpdateBootcampcontentResponse> {
    return this.httpClient.put<UpdateBootcampcontentResponse>(`${this.apiUrl}`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override getbybootcampId(pageRequest: PageRequest, bootcampId: number): Observable<BootcampcontentListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      bootcampId: bootcampId,
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<BootcampcontentListItemDto>(`${this.apiUrl}/getbootcampcontentbybootcampid`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: BootcampcontentListItemDto = {
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
