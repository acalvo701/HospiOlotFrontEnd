import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  login(dni: string, password: string){
  
    let userData = { dni: dni, password: password }
    return this.http.post<any>(`http://${environment.ip}:4000/treballador/login`, userData).pipe(
    map((response) =>{
      console.log(response);
      localStorage.setItem('SGaccessToken', response.accessToken);
      localStorage.setItem('SGrefreshToken', response.refreshToken);
          return response;
    })

    );
  }

  logout(){
    localStorage.removeItem('SGaccessToken');
    localStorage.removeItem('SGrefreshToken');
  }

  isAuthenticated():boolean{
    const token = localStorage.getItem('SGaccessToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

}