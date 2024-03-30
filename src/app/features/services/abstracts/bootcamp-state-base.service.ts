import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistBootcampstateResponse } from '../../models/responses/bootcampstate/getlist-bootcampstate-response';
import { GetbyidBootcampstateResponse } from '../../models/responses/bootcampstate/getbyid-bootcampstate-response';

@Injectable()
export abstract class BootcampStateBaseService {

  abstract getList():Observable<GetlistBootcampstateResponse[]>;
  abstract getById():Observable<GetbyidBootcampstateResponse>;
}
