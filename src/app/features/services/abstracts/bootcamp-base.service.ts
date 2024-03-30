import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistBootcampResponse } from '../../models/responses/bootcamp/getlist-bootcamp-response';
import { GetbyidBootcampResponse } from '../../models/responses/bootcamp/getbyid-bootcamp-response';

@Injectable()
export abstract class BootcampBaseService {

  abstract getList():Observable<GetlistBootcampResponse[]>;
  abstract getById():Observable<GetbyidBootcampResponse>;
}
