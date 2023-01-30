import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HeaderInfoService {

  constructor(private jwtHelper: JwtHelperService) { }

  getInfoToken() {
    return this.jwtHelper.decodeToken(localStorage.getItem('SGaccessToken')!);
  }
}
