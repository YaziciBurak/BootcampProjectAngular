import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { LocalStorageService } from '../../../features/services/concretes/local-storage.service';
import { AuthService } from '../../../features/services/concretes/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private storageService: LocalStorageService,
    private authService: AuthService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken();

    let authRequest = req;
    if (token) {
      authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authRequest).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !authRequest.url.includes('/login')
        ) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
              switchMap((response) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(response.token);
                this.storageService.setToken(response.token);

                return next.handle(
                  authRequest.clone({
                    setHeaders: {
                      Authorization: `Bearer ${response.token}`,
                    },
                  })
                );
              }),
              catchError((err) => {
                this.isRefreshing = false;
                this.storageService.removeToken();
                return throwError(err);
              })
            );
          } else {
            return this.refreshTokenSubject.pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((token) =>
                next.handle(
                  authRequest.clone({
                    setHeaders: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                )
              )
            );
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
}
