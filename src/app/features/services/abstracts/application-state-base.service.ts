import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetbyidApplicationstateResponse } from '../../models/responses/applicationstate/getbyid-applicationstate-response'; 
import { GetlistApplicationstateResponse } from '../../models/responses/applicationstate/getlist-applicationstate-response'; 

@Injectable()
export abstract class ApplicationStateBaseService {

  abstract getList():Observable<GetlistApplicationstateResponse[]>;
  abstract getById():Observable<GetbyidApplicationstateResponse>;
}
