import { Injectable } from '@angular/core';
import { QuizQuestionBaseService } from '../abstracts/quiz-question-base.service';
import { HttpClient } from '@angular/common/http';
import { PageRequest } from '../../../core/models/page-request';
import { Observable, map } from 'rxjs';
import { QuizQuestionListItemDto } from '../../models/responses/quizquestion/quiz-question-list-item-dto';
import { environment } from '../../../../environments/environment';
import { DeleteQuizQuestionResponse } from '../../models/responses/quizquestion/delete-quiz-question-response';
import { UpdateQuizQuestionRequest } from '../../models/requests/quizquestion/update-quiz-question-request';
import { UpdateQuizQuestionResponse } from '../../models/responses/quizquestion/update-quiz-question-response';
import { CreateQuizQuestionRequest } from '../../models/requests/quizquestion/create-quiz-question-request';
import { CreateQuizQuestionResponse } from '../../models/responses/quizquestion/create-quiz-question-response';
import { GetbyidQuizQuestionResponse } from '../../models/responses/quizquestion/getbyid-quiz-question-response';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService extends QuizQuestionBaseService {

  private readonly apiUrl:string = `${environment.API_URL}/QuizQuestions`
  constructor(private httpClient:HttpClient) {super()}

  override getList(pageRequest: PageRequest): Observable<QuizQuestionListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<QuizQuestionListItemDto>(this.apiUrl,{
      params:newRequest
    }).pipe(
      map((response)=>{
        const newResponse:QuizQuestionListItemDto={
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
  delete(id: number): Observable<DeleteQuizQuestionResponse> {
    return this.httpClient.delete<DeleteQuizQuestionResponse>( `${this.apiUrl}/`+ id);
  }

  update(request: UpdateQuizQuestionRequest): Observable<UpdateQuizQuestionResponse> {
    return this.httpClient.put<UpdateQuizQuestionResponse>(`${this.apiUrl}`, request);
  }

  create(request: CreateQuizQuestionRequest): Observable<CreateQuizQuestionResponse> {
    return this.httpClient.post<CreateQuizQuestionResponse>(`${this.apiUrl}`, request);
  }

  override getById(id: number): Observable<GetbyidQuizQuestionResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: id
    };
  
    return this.httpClient.get<GetbyidQuizQuestionResponse>(`${this.apiUrl}/${id}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidQuizQuestionResponse = {
          id: response.id,
          quizId: response.quizId,
          questionId: response.questionId
          
        };
        return newResponse;
      })
    );
  }

}
