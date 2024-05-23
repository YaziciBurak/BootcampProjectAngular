import { Injectable } from '@angular/core';
import { AuthBaseService } from '../abstracts/auth-base.service';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { ApplicantForRegisterRequest } from '../../models/requests/users/applicant-for-register-request';
import { UserForRegisterResponse } from '../../models/responses/users/user-for-register-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForLoginRequest } from '../../models/requests/users/user-for-login-request';
import { AccessTokenModel } from '../../models/responses/users/access-token-model';
import { TokenModel } from '../../models/responses/users/token-model';
import { EmployeeForRegisterRequest } from '../../models/requests/users/employee-for-register-request';
import { InstructorForRegisterRequest } from '../../models/requests/users/instructor-for-register-request';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthBaseService {
  fullname!:string;
  userId!:string;
  token:any;
  jwtHelper:JwtHelperService = new JwtHelperService;
  private loggedInSubject = new BehaviorSubject<boolean>(this.loggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();
  claims:string[]=[]


  private readonly apiUrl:string = `${environment.API_URL}/Auth`
  constructor(private httpClient:HttpClient,private storageService:LocalStorageService, private toastr:ToastrService) {super() }

  override register(userforRegisterRequest: ApplicantForRegisterRequest)
      :Observable<UserForRegisterResponse> {
    return this.httpClient.post<UserForRegisterResponse>(`${this.apiUrl}/register`,userforRegisterRequest)
  }

  override RegisterApplicant(applicantforRegisterRequest: ApplicantForRegisterRequest)
  :Observable<UserForRegisterResponse> {
return this.httpClient.post<UserForRegisterResponse>(`${this.apiUrl}/RegisterApplicant`,applicantforRegisterRequest)
}
override RegisterEmployee(employeeforRegisterRequest: EmployeeForRegisterRequest)
  :Observable<UserForRegisterResponse> {
return this.httpClient.post<UserForRegisterResponse>(`${this.apiUrl}/RegisterEmployee`,employeeforRegisterRequest)
}
override RegisterInstructor(instructorforRegisterRequest: InstructorForRegisterRequest)
  :Observable<UserForRegisterResponse> {
return this.httpClient.post<UserForRegisterResponse>(`${this.apiUrl}/RegisterInstructor`,instructorforRegisterRequest)
}
  login(userLoginRequest:UserForLoginRequest)
                        :Observable<AccessTokenModel<TokenModel>>

  {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`,userLoginRequest)
    .pipe(
      map(response => {
        this.storageService.setToken(response.accessToken.token);
        this.loggedInSubject.next(true);  
        setTimeout(() => {

          window.location.reload();
        }, 3000);  
        return response;
      }),
      catchError(responseError => {
        this.toastr.error(responseError.error, 'Hata');
        throw responseError;
      })
    );
}

  getDecodedToken(){
    try{
      this.token=this.storageService.getToken();
      return this.jwtHelper.decodeToken(this.token)
    }
    catch(error){
      return error;
    }
  }

  loggedIn():boolean{
    this.token=this.storageService.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(this.token);
    return !isExpired;
  }
  getUserName():string{
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter(x=>x.endsWith("/name"))[0]
    return this.fullname=decoded[propUserName];
  }

  getCurrentUserId():string{
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
    return this.userId=decoded[propUserId]
  }

  logOut(){
    this.storageService.removeToken();
    this.toastr.success('Çıkış yapıldı', 'Başarılı');
    this.loggedInSubject.next(false); 
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  getRoles():string[]{
    if(this.storageService.getToken()){
      var decoded = this.getDecodedToken()
      var role = Object.keys(decoded).filter(x=>x.endsWith("/role"))[0]
      this.claims=decoded[role]
    }
    return this.claims;
  }
  isAdmin(){
    if(this.claims.includes("Admin")){
      return true;
    }
    return false;
  }
  
}
