import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetlistApplicationstateResponse } from '../../models/responses/applicationstate/getlist-applicationstate-response'; 
import { GetbyidApplicationstateResponse } from '../../models/responses/applicationstate/getbyid-applicationstate-response'; 
import { ApplicationStateBaseService } from '../abstracts/application-state-base.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService extends ApplicationStateBaseService {

  apiGetListUrl=""
  apiGetByIdUrl=""

  constructor(private httpClient:HttpClient) {super() }

   override getList(): Observable<GetlistApplicationstateResponse[]> {
    return this.httpClient.get<GetlistApplicationstateResponse[]>(this.apiGetListUrl);
  }
  override getById(): Observable<GetbyidApplicationstateResponse> {
    return this.httpClient.get<GetbyidApplicationstateResponse>(this.apiGetByIdUrl);
  }
}
