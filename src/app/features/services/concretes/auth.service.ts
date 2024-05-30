import { Injectable } from '@angular/core';
import { AuthBaseService } from '../abstracts/auth-base.service';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { ApplicantForRegisterRequest } from '../../models/requests/users/applicant-for-register-request';
import { UserForRegisterResponse } from '../../models/responses/users/user-for-register-response';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForLoginRequest } from '../../models/requests/users/user-for-login-request';
import { AccessTokenModel } from '../../models/responses/users/access-token-model';
import { TokenModel } from '../../models/responses/users/token-model';
import { EmployeeForRegisterRequest } from '../../models/requests/users/employee-for-register-request';
import { InstructorForRegisterRequest } from '../../models/requests/users/instructor-for-register-request';
import { ToastrService } from 'ngx-toastr';
import { ApplicantVerifyEmailRequest } from '../../models/requests/applicant/applicant-verify-email-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthBaseService {
  fullname!: string;
  userId!: string;
  token: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  private loggedInSubject = new BehaviorSubject<boolean>(this.loggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();
  claims: string[] = [];

  private readonly apiUrl: string = `${environment.API_URL}/Auth`;
  constructor(
    private httpClient: HttpClient,
    private storageService: LocalStorageService,
    private toastr: ToastrService
  ) {
    super();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Bir hata oluştu';

    if (error.error instanceof ErrorEvent) {
      // Client-side hata
      errorMessage = `Hata: ${error.error.message}`;
    } else {
      // Backend hatası
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 500 && error.error) {
        // Hata mesajını backend'den alınan response'un ilk satırından ayıklayın
        const backendErrorMessage = error.error.split('\n')[0];
        if (backendErrorMessage.includes('BusinessException')) {
          errorMessage = backendErrorMessage.split(': ')[1]; // Sadece hata mesajını al
        }
      } else {
        errorMessage = `Sunucu Hatası: ${error.status}\nMesaj: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }

  override register(
    userforRegisterRequest: ApplicantForRegisterRequest
  ): Observable<UserForRegisterResponse> {
    return this.httpClient.post<UserForRegisterResponse>(
      `${this.apiUrl}/register`,
      userforRegisterRequest
    );
  }

  override RegisterEmployee(
    employeeforRegisterRequest: EmployeeForRegisterRequest
  ): Observable<UserForRegisterResponse> {
    return this.httpClient.post<UserForRegisterResponse>(
      `${this.apiUrl}/RegisterEmployee`,
      employeeforRegisterRequest
    );
  }
  override RegisterInstructor(
    instructorforRegisterRequest: InstructorForRegisterRequest
  ): Observable<UserForRegisterResponse> {
    return this.httpClient.post<UserForRegisterResponse>(
      `${this.apiUrl}/RegisterInstructor`,
      instructorforRegisterRequest
    );
  }

  override RegisterApplicant(
    applicantforRegisterRequest: ApplicantForRegisterRequest
  ): Observable<UserForRegisterResponse> {
    return this.httpClient
      .post<UserForRegisterResponse>(
        `${this.apiUrl}/RegisterApplicant`,
        applicantforRegisterRequest
      )
      .pipe(catchError(this.handleError.bind(this)));
  }

  login(
    userLoginRequest: UserForLoginRequest
  ): Observable<AccessTokenModel<TokenModel>> {
    return this.httpClient
      .post<AccessTokenModel<TokenModel>>(
        `${this.apiUrl}/login`,
        userLoginRequest,
        { withCredentials: true }
      )
      .pipe(
        map((response) => {
          this.storageService.setToken(response.accessToken.token);
          this.loggedInSubject.next(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
          return response;
        }),
        catchError((responseError) => {
          const errorMessage = this.getErrorMessage(responseError);
          this.toastr.error(errorMessage, 'Hata');
          return throwError(responseError);
        })
      );
  }
  refreshToken(): Observable<any> {
    return this.httpClient
      .get<TokenModel>(`${this.apiUrl}/RefreshToken`, {
        withCredentials: true,
      })
      .pipe(
        tap((response: TokenModel) => {
          this.storageService.setToken(response.token);
        })
      );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          return 'Hatalı istek';
        case 404:
          return 'Kullanıcı bulunamadı';
        case 500:
          return 'Kullanıcı adı veya şifre hatalı';
        default:
          return 'Giriş yaparken hata oluştu';
      }
    }
  }
  getDecodedToken() {
    try {
      this.token = this.storageService.getToken();
      return this.jwtHelper.decodeToken(this.token);
    } catch (error) {
      return error;
    }
  }
  loggedIn(): boolean {
    this.token = this.storageService.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(this.token);
    console.log("isLoggedIn", "token=", this.token, "expired=", isExpired);
    return !isExpired;
  }
  getUserName(): string {
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter((x) =>
      x.endsWith('/name')
    )[0];
    return (this.fullname = decoded[propUserName]);
  }

  getCurrentUserId(): string {
    var decoded = this.getDecodedToken();

    if (!decoded) {
      // Token çözümlenemedi veya yoksa null döndür
      return null;
    }
    var propUserId = Object.keys(decoded).filter((x) =>
      x.endsWith('/nameidentifier')
    )[0];
    return (this.userId = decoded[propUserId]);
  }

  logOut() {
    this.storageService.removeToken();
    this.toastr.success('Çıkış yapıldı', 'Başarılı');
    this.loggedInSubject.next(false);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
  getRoles(): string[] {
    if (this.storageService.getToken()) {
      var decoded = this.getDecodedToken();
      var role = Object.keys(decoded).filter((x) => x.endsWith('/role'))[0];
      this.claims = decoded[role];
    }
    return this.claims;
  }
  isAdmin() {
    if (this.claims.includes('Admin')) {
      return true;
    }
    return false;
  }
  verifyEmail(request: ApplicantVerifyEmailRequest) {
    return this.httpClient.post(`${this.apiUrl}/VerifyEmail`, request);
  }
}
