import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/page-request';
import { Observable } from 'rxjs';
import { QuizQuestionListItemDto } from '../../models/responses/quizquestion/quiz-question-list-item-dto';
import { GetbyidQuizQuestionResponse } from '../../models/responses/quizquestion/getbyid-quiz-question-response';
import { DeleteQuizQuestionResponse } from '../../models/responses/quizquestion/delete-quiz-question-response';
import { UpdateQuizQuestionRequest } from '../../models/requests/quizquestion/update-quiz-question-request';
import { UpdateQuizQuestionResponse } from '../../models/responses/quizquestion/update-quiz-question-response';
import { CreateQuizQuestionRequest } from '../../models/requests/quizquestion/create-quiz-question-request';
import { CreateQuizQuestionResponse } from '../../models/responses/quizquestion/create-quiz-question-response';

@Injectable()
export abstract class QuizQuestionBaseService {

  abstract getList(pageRequest:PageRequest): Observable<QuizQuestionListItemDto>;
  abstract getById(id:number):Observable<GetbyidQuizQuestionResponse>;
  abstract delete(id: number): Observable<DeleteQuizQuestionResponse>;
  abstract update(request: UpdateQuizQuestionRequest): Observable<UpdateQuizQuestionResponse>;
  abstract create(request: CreateQuizQuestionRequest): Observable<CreateQuizQuestionResponse>;
}
