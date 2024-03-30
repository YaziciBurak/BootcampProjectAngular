import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationBaseService } from '../abstracts/application-base.service';
import { GetlistApplicationResponse } from '../../models/responses/application/getlist-application-response';
import { GetbyidApplicationResponse } from '../../models/responses/application/getbyid-application-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicationService extends ApplicationBaseService{

  apiGetListUrl=""
  apiGetByIdUrl=""
 
  constructor(private httpClient:HttpClient) {super() }
  
  override getList(): Observable<GetlistApplicationResponse[]> {
    return this.httpClient.get<GetlistApplicationResponse[]>(this.apiGetListUrl);
  }
  override getById(): Observable<GetbyidApplicationResponse> {
    return this.httpClient.get<GetbyidApplicationResponse>(this.apiGetByIdUrl);
  }

  
}
