import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampStateBaseService } from '../abstracts/bootcamp-state-base.service';
import { GetlistBootcampstateResponse } from '../../models/responses/bootcampstate/getlist-bootcampstate-response';
import { GetbyidBootcampstateResponse } from '../../models/responses/bootcampstate/getbyid-bootcampstate-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampStateService extends BootcampStateBaseService{

  apiGetListUrl=""
  apiGetByIdUrl=""

  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetlistBootcampstateResponse[]> {
    return this.httpClient.get<GetlistBootcampstateResponse[]>(this.apiGetListUrl);
  }
  override getById(): Observable<GetbyidBootcampstateResponse> {
  return this.httpClient.get<GetbyidBootcampstateResponse>(this.apiGetByIdUrl);  
  }
}
