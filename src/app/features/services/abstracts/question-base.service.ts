import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/page-request';
import { Observable } from 'rxjs';
import { QuestionListItemDto } from '../../models/responses/question/question-list-item-dto';
import { GetbyidQuestionResponse } from '../../models/responses/question/getbyid-question-response';
import { DeleteQuestionResponse } from '../../models/responses/question/delete-question-response';
import { UpdateQuestionRequest } from '../../models/requests/question/update-question-request';
import { UpdateQuestionResponse } from '../../models/responses/question/update-question-response';
import { CreateQuestionRequest } from '../../models/requests/question/create-question-request';
import { CreateQuestionResponse } from '../../models/responses/question/create-question-response';

@Injectable()
export abstract class QuestionBaseService {

  abstract getList(pageRequest:PageRequest): Observable<QuestionListItemDto>;
  abstract getById(id:number):Observable<GetbyidQuestionResponse>;
  abstract delete(id: number): Observable<DeleteQuestionResponse>;
  abstract update(question: UpdateQuestionRequest): Observable<UpdateQuestionResponse>;
  abstract create(question: CreateQuestionRequest): Observable<CreateQuestionResponse>;
}
