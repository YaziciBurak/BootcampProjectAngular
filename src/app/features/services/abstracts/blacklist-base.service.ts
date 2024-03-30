import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetlistBlacklistResponse } from '../../models/responses/blacklist/getlist-blacklist-response';
import { GetbyidBlacklistResponse } from '../../models/responses/blacklist/getbyid-blacklist-response';

@Injectable()
export abstract class BlacklistBaseService {

  abstract getList():Observable<GetlistBlacklistResponse[]>;
  abstract getById():Observable<GetbyidBlacklistResponse>;
}
