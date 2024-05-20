import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetbyidApplicationstateResponse } from '../../models/responses/applicationstate/getbyid-applicationstate-response';
import { ApplicationStateBaseService } from '../abstracts/application-state-base.service';
import { environment } from '../../../../environments/environment.development';
import { CreateApplicationstateRequest } from '../../models/requests/applicationstate/create-applicationstate-request';
import { CreateApplicationstateResponse } from '../../models/responses/applicationstate/create-applicationstate-response';
import { DeleteApplicationstateResponse } from '../../models/responses/applicationstate/delete-applicationstate-response';
import { PageRequest } from '../../../core/models/page-request';
import { ApplicationstateListItemDto } from '../../models/responses/applicationstate/applicationstate-list-item-dto';
import { UpdateApplicationstateRequest } from '../../models/requests/applicationstate/update-applicationstate-request';
import { UpdateApplicationstateResponse } from '../../models/responses/applicationstate/update-applicationstate-response';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService extends ApplicationStateBaseService {

  private readonly apiUrl: string = `${environment.API_URL}/ApplicationStates`

  constructor(private httpClient: HttpClient) { super() }

  override getList(pageRequest: PageRequest): Observable<ApplicationstateListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<ApplicationstateListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: ApplicationstateListItemDto = {
          index: pageRequest.pageIndex,
          size: pageRequest.pageSize,
          count: response.count,
          hasNext: response.hasNext,
          hasPrevious: response.hasPrevious,
          items: response.items,
          pages: response.pages
        };
        return newResponse;
      })
    )
  }

  override create(request: CreateApplicationstateRequest): Observable<CreateApplicationstateResponse> {
    return this.httpClient.post<CreateApplicationstateResponse>(this.apiUrl, request);
  }
  override delete(id: number): Observable<DeleteApplicationstateResponse> {
    return this.httpClient.delete<DeleteApplicationstateResponse>(`${this.apiUrl}/` + id)
  }
  override update(request: UpdateApplicationstateRequest): Observable<UpdateApplicationstateResponse> {
    return this.httpClient.put<UpdateApplicationstateResponse>(`${this.apiUrl}`, request);
  }

  override getById(applicationStateId: number): Observable<GetbyidApplicationstateResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: applicationStateId
    };
    return this.httpClient.get<GetbyidApplicationstateResponse>(`${this.apiUrl}/${applicationStateId}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidApplicationstateResponse = {
          id: response.id,
          name: response.name,
        };
        return newResponse;
      })
    );
  }
  override getListAll(): Observable<ApplicationstateListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: 0,
      pageSize: 100
    };

    return this.httpClient.get<ApplicationstateListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: ApplicationstateListItemDto = {
          index: 0,
          size: 100,
          count: response.count,
          hasNext: response.hasNext,
          hasPrevious: response.hasPrevious,
          items: response.items,
          pages: response.pages
        };
        return newResponse;
      })
    )
  }
}
