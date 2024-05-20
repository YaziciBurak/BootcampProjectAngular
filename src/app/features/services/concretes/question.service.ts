import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionBaseService } from '../abstracts/question-base.service';
import { PageRequest } from '../../../core/models/page-request';
import { Observable, map } from 'rxjs';
import { QuestionListItemDto } from '../../models/responses/question/question-list-item-dto';
import { DeleteQuestionResponse } from '../../models/responses/question/delete-question-response';
import { UpdateQuestionRequest } from '../../models/requests/question/update-question-request';
import { UpdateQuestionResponse } from '../../models/responses/question/update-question-response';
import { CreateQuestionRequest } from '../../models/requests/question/create-question-request';
import { CreateQuestionResponse } from '../../models/responses/question/create-question-response';
import { GetbyidQuestionResponse } from '../../models/responses/question/getbyid-question-response';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends QuestionBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/Questions`

  constructor(private httpClient: HttpClient) { super() }

  override getList(pageRequest: PageRequest): Observable<QuestionListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<QuestionListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: QuestionListItemDto = {
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

  override delete(id: number): Observable<DeleteQuestionResponse> {
    return this.httpClient.delete<DeleteQuestionResponse>(`${this.apiUrl}/` + id);
  }

  override update(request: UpdateQuestionRequest): Observable<UpdateQuestionResponse> {
    return this.httpClient.put<UpdateQuestionResponse>(`${this.apiUrl}`, request);
  }

  override create(request: CreateQuestionRequest): Observable<CreateQuestionResponse> {
    return this.httpClient.post<CreateQuestionResponse>(`${this.apiUrl}`, request);
  }

  override getById(id: number): Observable<GetbyidQuestionResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: id
    };

    return this.httpClient.get<GetbyidQuestionResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidQuestionResponse = {
          id: response.id,
          bootcampId: response.bootcampId,
          text: response.text,
          answerA: response.answerA,
          answerB: response.answerB,
          answerC: response.answerC,
          answerD: response.answerD,
          correctAnswer: response.correctAnswer

        };
        return newResponse;
      })
    );
  }
}
