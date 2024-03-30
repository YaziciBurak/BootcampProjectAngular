import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampImageBaseService } from '../abstracts/bootcamp-image-base.service';
import { GetlistBootcampimageResponse } from '../../models/responses/bootcampimage/getlist-bootcampimage-response';
import { GetbyidBootcampimageResponse } from '../../models/responses/bootcampimage/getbyid-bootcampimage-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampImageService extends BootcampImageBaseService {

  apiGetListUrl=""
  apiGetByIdUrl=""

  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetlistBootcampimageResponse[]> {
    return this.httpClient.get<GetlistBootcampimageResponse[]>(this.apiGetListUrl)
  }
  override getById(): Observable<GetbyidBootcampimageResponse> {
  return this.httpClient.get<GetbyidBootcampimageResponse>(this.apiGetByIdUrl)
}
}
