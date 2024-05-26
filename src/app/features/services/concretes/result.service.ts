import { Injectable } from '@angular/core';
import { ResultBaseService } from '../abstracts/result-base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PageRequest } from '../../../core/models/page-request';
import { ResultListItemDto } from '../../models/responses/result/result-list-item-dto';
import { Observable, catchError, map, throwError, timeInterval } from 'rxjs';
import { DeleteResultResponse } from '../../models/responses/result/delete-result-response';
import { UpdateResultRequest } from '../../models/requests/result/update-result-request';
import { UpdateResultResponse } from '../../models/responses/result/update-result-response';
import { CreateResultRequest } from '../../models/requests/result/create-result-request';
import { CreateResultResponse } from '../../models/responses/result/create-result-response';
import { GetbyidResultResponse } from '../../models/responses/result/getbyid-result-response';

@Injectable({
  providedIn: 'root'
})
export class ResultService extends ResultBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/Results`

  constructor(private httpClient: HttpClient) { super() }

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

  override getList(pageRequest: PageRequest): Observable<ResultListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<ResultListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: ResultListItemDto = {
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
  override delete(id: number): Observable<DeleteResultResponse> {
    return this.httpClient.delete<DeleteResultResponse>(`${this.apiUrl}/` + id)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override update(request: UpdateResultRequest): Observable<UpdateResultResponse> {
    return this.httpClient.put<UpdateResultResponse>(`${this.apiUrl}`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override create(request: CreateResultRequest): Observable<CreateResultResponse> {
    return this.httpClient.post<CreateResultResponse>(`${this.apiUrl}`, request)
    .pipe(catchError(this.handleError.bind(this))
    );
  }
  override getById(id: number): Observable<GetbyidResultResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: id
    };
    return this.httpClient.get<GetbyidResultResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidResultResponse = {
          id: response.id,
          quizId: response.quizId,
          wrongAnswers: response.wrongAnswers,
          correctAnswers: response.correctAnswers
        };
        return newResponse;
      })
    );
  }
}
