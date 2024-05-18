import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { QuizListItemDto } from '../../models/responses/quiz/quiz-list-item-dto';
import { GetbyidQuizResponse } from '../../models/responses/quiz/getbyid-quiz-response';
import { DeleteQuizResponse } from '../../models/responses/quiz/delete-quiz-response';
import { UpdateQuizRequest } from '../../models/requests/quiz/update-quiz-request';
import { UpdateQuizResponse } from '../../models/responses/quiz/update-quiz-response';
import { CreateQuizRequest } from '../../models/requests/quiz/create-quiz-request';
import { CreateQuizResponse } from '../../models/responses/quiz/create-quiz-response';
import { FinishQuizResponse } from '../../models/responses/quiz/finish-quiz-response';
import { FinishQuizRequest } from '../../models/requests/quiz/finish-quiz-request';

@Injectable()
export abstract class QuizBaseService {

  abstract getList(pageRequest:PageRequest): Observable<QuizListItemDto>;
  abstract getById(id:number):Observable<GetbyidQuizResponse>;
  abstract delete(id: number): Observable<DeleteQuizResponse>;
  abstract update(question: UpdateQuizRequest): Observable<UpdateQuizResponse>;
  abstract create(question: CreateQuizRequest): Observable<CreateQuizResponse>;
  abstract getExam(id: number): Observable<CreateQuizResponse>;
  abstract finishQuiz(request:FinishQuizRequest):Observable<FinishQuizResponse>;
  
  
}
