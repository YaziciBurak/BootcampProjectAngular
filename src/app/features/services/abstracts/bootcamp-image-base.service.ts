import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistBootcampimageResponse } from '../../models/responses/bootcampimage/getlist-bootcampimage-response';
import { GetbyidBootcampimageResponse } from '../../models/responses/bootcampimage/getbyid-bootcampimage-response';

@Injectable()
export abstract class BootcampImageBaseService {

  abstract getList():Observable<GetlistBootcampimageResponse[]>;
  abstract getById():Observable<GetbyidBootcampimageResponse>;
}
