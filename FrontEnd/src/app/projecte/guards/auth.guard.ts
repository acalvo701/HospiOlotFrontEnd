import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthenticationService } from '../model/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private http: HttpClient, private auth: AuthenticationService, private router: Router){}
  async canActivate(): Promise<boolean>{
    const accessToken = localStorage.getItem("SGaccessToken");
    if(this.auth.isAuthenticated()){
      return true;
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
      const response = await lastValueFrom(this.http.post(`http://localhost:4000/treballador/refreshToken`, tokenModel));
      const newToken = (<any>response).accessToken;
      const newRefreshToken = (<any>response).refreshToken;
      localStorage.setItem("SGaccessToken", newToken);
      localStorage.setItem("SGrefreshToken", newRefreshToken);
      console.log("Token renewed successfully", "Success");
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
  
}
