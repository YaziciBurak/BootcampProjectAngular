import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { QuizBaseService } from '../abstracts/quiz-base.service';
import { HttpClient } from '@angular/common/http';
import { PageRequest } from '../../../core/models/page-request';
import { Observable, map } from 'rxjs';
import { QuizListItemDto } from '../../models/responses/quiz/quiz-list-item-dto';
import { DeleteQuizResponse } from '../../models/responses/quiz/delete-quiz-response';
import { UpdateQuizRequest } from '../../models/requests/quiz/update-quiz-request';
import { UpdateQuizResponse } from '../../models/responses/quiz/update-quiz-response';
import { CreateQuizRequest } from '../../models/requests/quiz/create-quiz-request';
import { CreateQuizResponse } from '../../models/responses/quiz/create-quiz-response';
import { GetbyidQuizResponse } from '../../models/responses/quiz/getbyid-quiz-response';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends QuizBaseService {
  private readonly apiUrl:string = `${environment.API_URL}/Quizs`

  constructor(private httpClient:HttpClient) {super()}

  override getList(pageRequest: PageRequest): Observable<QuizListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<QuizListItemDto>(this.apiUrl,{
      params:newRequest
    }).pipe(
      map((response)=>{
        const newResponse:QuizListItemDto={
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
  delete(id: number): Observable<DeleteQuizResponse> {
    return this.httpClient.delete<DeleteQuizResponse>( `${this.apiUrl}/`+ id);
  }

  update(request: UpdateQuizRequest): Observable<UpdateQuizResponse> {
    return this.httpClient.put<UpdateQuizResponse>(`${this.apiUrl}`, request);
  }

  create(request: CreateQuizRequest): Observable<CreateQuizResponse> {
    return this.httpClient.post<CreateQuizResponse>(`${this.apiUrl}`, request);
  }
  override getById(id: number): Observable<GetbyidQuizResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: id
    };
  
    return this.httpClient.get<GetbyidQuizResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidQuizResponse = {
          id: response.id,
          applicantId: response.applicantId,
          bootcampId: response.bootcampId,
          startTime: response.startTime,
          endTime: response.endTime
          
        };
        return newResponse;
      })
    );
  }
}
