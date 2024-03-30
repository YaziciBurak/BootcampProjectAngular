import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistApplicationResponse } from '../../models/responses/application/getlist-application-response';
import { GetbyidApplicationResponse } from '../../models/responses/application/getbyid-application-response';

@Injectable()
export abstract class ApplicationBaseService {

  abstract getList():Observable<GetlistApplicationResponse[]>;
  abstract getById():Observable<GetbyidApplicationResponse>;
}
