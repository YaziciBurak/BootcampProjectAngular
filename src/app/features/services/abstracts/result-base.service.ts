import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/page-request';
import { ResultListItemDto } from '../../models/responses/result/result-list-item-dto';
import { GetbyidResultResponse } from '../../models/responses/result/getbyid-result-response';
import { Observable } from 'rxjs';
import { DeleteResultResponse } from '../../models/responses/result/delete-result-response';
import { UpdateResultRequest } from '../../models/requests/result/update-result-request';
import { UpdateResultResponse } from '../../models/responses/result/update-result-response';
import { CreateResultRequest } from '../../models/requests/result/create-result-request';
import { CreateResultResponse } from '../../models/responses/result/create-result-response';

@Injectable()
export abstract class ResultBaseService {

  abstract getList(pageRequest:PageRequest): Observable<ResultListItemDto>;
  abstract getById(id:number):Observable<GetbyidResultResponse>;
  abstract delete(id: number): Observable<DeleteResultResponse>;
  abstract update(question: UpdateResultRequest): Observable<UpdateResultResponse>;
  abstract create(question: CreateResultRequest): Observable<CreateResultResponse>;
}
