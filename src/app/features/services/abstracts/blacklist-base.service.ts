import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { BlackListListItemDto } from '../../models/responses/blacklist/blacklist-list-item-item-dto'; 
import { GetbyidBlacklistResponse } from '../../models/responses/blacklist/getbyid-blacklist-response';
import { CreateBlacklistResponse } from '../../models/responses/blacklist/create-blacklist-response';
import { CreateBlacklistRequest } from '../../models/requests/blacklist/create-blacklist-request';
import { DeleteBlacklistResponse } from '../../models/responses/blacklist/delete-blacklist-response';
import { UpdateBlacklistRequest } from '../../models/requests/blacklist/update-blacklistre-quest';
import { UpdateBlacklistResponse } from '../../models/responses/blacklist/update-blacklist-response';


@Injectable()
export abstract class BlacklistBaseService {

  abstract getList(pageRequest:PageRequest):Observable<BlackListListItemDto>;
  abstract getById(blacklistId:number):Observable<GetbyidBlacklistResponse>;
  abstract create(request:CreateBlacklistRequest):Observable<CreateBlacklistResponse>;
  abstract delete(id:number):Observable<DeleteBlacklistResponse>;
  abstract update(request:UpdateBlacklistRequest):Observable<UpdateBlacklistResponse>;
}
