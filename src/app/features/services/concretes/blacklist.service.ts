import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlacklistBaseService } from '../abstracts/blacklist-base.service';
import { GetbyidBlacklistResponse } from '../../models/responses/blacklist/getbyid-blacklist-response';
import { environment } from '../../../../environments/environment';
import { PageRequest } from '../../../core/models/page-request';
import { BlackListListItemDto } from '../../models/responses/blacklist/blacklist-list-item-item-dto';
import { CreateBlacklistRequest } from '../../models/requests/blacklist/create-blacklist-request';
import { CreateBlacklistResponse } from '../../models/responses/blacklist/create-blacklist-response';
import { DeleteBlacklistResponse } from '../../models/responses/blacklist/delete-blacklist-response';
import { UpdateBlacklistRequest } from '../../models/requests/blacklist/update-blacklistre-quest';
import { UpdateBlacklistResponse } from '../../models/responses/blacklist/update-blacklist-response';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService extends BlacklistBaseService {

  private readonly apiUrl: string = `${environment.API_URL}/Blacklists`

  constructor(private httpClient: HttpClient) { super() }

  override getList(pageRequest: PageRequest): Observable<BlackListListItemDto> {
    const newRequest: { [key: string]: string | number } = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<BlackListListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: BlackListListItemDto = {
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
  override create(request: CreateBlacklistRequest): Observable<CreateBlacklistResponse> {
    return this.httpClient.post<CreateBlacklistResponse>(`${this.apiUrl}`, request);
  }
  override delete(id: number): Observable<DeleteBlacklistResponse> {
    return this.httpClient.delete<DeleteBlacklistResponse>(`${this.apiUrl}/` + id)
  }
  override update(request: UpdateBlacklistRequest): Observable<UpdateBlacklistResponse> {
    return this.httpClient.put<UpdateBlacklistResponse>(`${this.apiUrl}`, request);
  }
  override getById(blacklistId: number): Observable<GetbyidBlacklistResponse> {
    const newRequest: { [key: string]: string | number } = {
      id: blacklistId
    };
    return this.httpClient.get<GetbyidBlacklistResponse>(`${this.apiUrl}/${blacklistId}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetbyidBlacklistResponse = {
          id: response.id,
          applicantId: response.applicantId,
          applicantFirstName: response.applicantFirstName,
          applicantLastName: response.applicantLastName,
          date: response.date,
          reason: response.reason,
        };
        return newResponse;
      })
    );
  }

}
