import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthenticationService } from '../model/services/auth/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  IP:string;
  
  constructor( private http: HttpClient, private auth: AuthenticationService, private router: Router) {
    this.IP = environment.ip;
  }
  async canActivate(): Promise<boolean>{
    const accessToken = localStorage.getItem("SGaccessToken");
    if(this.auth.isAuthenticated()){
      return true;
    }
    if(this.auth.isRefreshExpired()){
      this.router.navigate(['login']);
      return false;
    }
    const isRefreshSuccess = await this.refreshingTokens(accessToken);
    
    if(!isRefreshSuccess){
      this.router.navigate(['login']);
      return false;
    }

    return true;

  }

  private async refreshingTokens(accessToken: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("SGrefreshToken");

    if (!accessToken || !refreshToken) {
      return false;
    }

    



    const tokenModel = { accessToken: accessToken, refreshToken: refreshToken };
    
    let isRefreshSuccess: boolean;
    try {
      const response = await lastValueFrom(this.http.post(`http://${environment.ip}:4000/token/refreshToken`, tokenModel));
      const newToken = (<any>response).accessToken;
      const newRefreshToken = (<any>response).refreshToken;
      localStorage.setItem("SGaccessToken", newToken);
      localStorage.setItem("SGrefreshToken", newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
  
}
