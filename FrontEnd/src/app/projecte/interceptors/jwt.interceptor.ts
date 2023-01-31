import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse 
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { throwError, BehaviorSubject, of, finalize } from "rxjs";
import { filter, take, switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor( private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let req = request;
    const token = localStorage.getItem('SGaccessToken');
    if (token) {
      request = req.clone(
        {
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        });
    }

    return next.handle(request).pipe(catchError((err:HttpErrorResponse)=>{
      
      if (err.status === 401) {
        this.router.navigateByUrl('/login');
      }
      return throwError( err );

    })



    )




  }
}
