import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlacklistBaseService } from '../abstracts/blacklist-base.service';
import { GetlistBlacklistResponse } from '../../models/responses/blacklist/getlist-blacklist-response';
import { GetbyidBlacklistResponse } from '../../models/responses/blacklist/getbyid-blacklist-response';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService extends BlacklistBaseService{

  apiGetListUrl=""
  apiGetByIdUrl=""

  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetlistBlacklistResponse[]> {
    return this.httpClient.get<GetlistBlacklistResponse[]>(this.apiGetListUrl);
  }
  override getById(): Observable<GetbyidBlacklistResponse> {
    return this.httpClient.get<GetbyidBlacklistResponse>(this.apiGetByIdUrl)
  }

}
