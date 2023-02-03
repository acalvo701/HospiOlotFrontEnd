import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { throwError, BehaviorSubject, of, finalize } from "rxjs";
import { filter, take, switchMap, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../model/services/auth/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const accessToken = localStorage.getItem('SGaccessToken');
    if (accessToken) {
      authReq = req.clone(
        {
          setHeaders: {
            authorization: `Bearer ${accessToken}`
          }
        });
    }

    return next.handle(authReq).pipe(catchError((err: HttpErrorResponse) => {

      if (err.status == 403 || err.status == 400) {//Fem retry
        return this.handleTokenError(authReq, next);
      }
      if(err.status == 401){
        this.router.navigate(['login']);
        return throwError(err);
      }

      return throwError(err);
    })
    )

  }

  private handleTokenError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const accessToken = localStorage.getItem('SGaccessToken');
      const refreshToken = localStorage.getItem('SGrefreshToken');
      const tokenModel = { accessToken: accessToken, refreshToken: refreshToken };
      if (accessToken && refreshToken)
        return this.authService.refreshToken(tokenModel).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            localStorage.setItem("SGaccessToken", token.accessToken);
            localStorage.setItem("SGrefreshToken", token.refreshToken);

            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            localStorage.removeItem("SGaccessToken");
            localStorage.removeItem("SGrefreshToken");
            this.isRefreshing = false;
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );

  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {

    return request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    });
  }


}