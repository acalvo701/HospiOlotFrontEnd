import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  IP: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.IP = "localhost";
  }

  login(dni: string, password: string){
  
    let userData = { dni: dni, password: password }
    return this.http.post<any>(`http://${this.IP}:4000/treballador/login`, userData).pipe(
    map((response) =>{
      console.log(response);
      localStorage.setItem('SGaccessToken', response.accessToken);
      localStorage.setItem('SGrefreshToken', response.refreshToken);
          return response;
    })

    );
  }

  isAuthenticated():boolean{
    const token = localStorage.getItem('SGaccessToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

}