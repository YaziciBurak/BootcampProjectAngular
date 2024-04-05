import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampStateBaseService } from '../abstracts/bootcamp-state-base.service';
import { GetlistBootcampstateResponse } from '../../models/responses/bootcampstate/getlist-bootcampstate-response';
import { GetbyidBootcampstateResponse } from '../../models/responses/bootcampstate/getbyid-bootcampstate-response';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BootcampStateService extends BootcampStateBaseService{

  private readonly apiUrl:string = `${environment.API_URL}/BootcampStates`

  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetlistBootcampstateResponse[]> {
    return this.httpClient.get<GetlistBootcampstateResponse[]>(this.apiUrl);
  }
  override getById(): Observable<GetbyidBootcampstateResponse> {
  return this.httpClient.get<GetbyidBootcampstateResponse>(this.apiUrl);  
  }
}
