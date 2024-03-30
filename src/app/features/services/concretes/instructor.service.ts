import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { GetlistInstructorResponse } from '../../models/responses/instructor/getlist-instructor-response';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends InstructorBaseService{

  apiGetListUrl=""
  apiGetByIdUrl=""

  constructor(private httpClient:HttpClient) {super() }
  override getList(): Observable<GetlistInstructorResponse[]> {
    return this.httpClient.get<GetlistInstructorResponse[]>(this.apiGetListUrl);
  }
  override getById(): Observable<GetbyidInstructorResponse> {
    return this.httpClient.get<GetbyidInstructorResponse>(this.apiGetByIdUrl);
  }
}
