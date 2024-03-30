import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { GetlistBootcampResponse } from '../../models/responses/bootcamp/getlist-bootcamp-response';
import { GetbyidBootcampResponse } from '../../models/responses/bootcamp/getbyid-bootcamp-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampService extends BootcampBaseService{

  apiGetListUrl=""
  apiGetByIdUrl=""

  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetlistBootcampResponse[]> {
    return this.httpClient.get<GetlistBootcampResponse[]>(this.apiGetListUrl)
  }
  override getById(): Observable<GetbyidBootcampResponse> {
    return this.httpClient.get<GetbyidBootcampResponse>(this.apiGetByIdUrl)
  }
}
