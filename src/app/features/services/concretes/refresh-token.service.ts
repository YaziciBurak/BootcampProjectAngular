import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { AccessTokenModel } from '../../models/responses/users/access-token-model';
import { TokenModel } from '../../models/responses/users/token-model';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private readonly apiUrl: string = `${environment.API_URL}/Auth`;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient, private storageService: LocalStorageService) {}

  refreshToken(): Observable<AccessTokenModel<TokenModel>> {
    const refreshToken = this.storageService.getRefreshToken();
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/RefreshToken`, { refreshToken })
      .pipe(
        tap((response: AccessTokenModel<TokenModel>) => {
          this.storageService.setToken(response.accessToken.token);
        })
      );
  }

  getRefreshTokenSubject() {
    return this.refreshTokenSubject;
  }

  setRefreshing(isRefreshing: boolean) {
    this.isRefreshing = isRefreshing;
  }

  getIsRefreshing() {
    return this.isRefreshing;
  }
}
