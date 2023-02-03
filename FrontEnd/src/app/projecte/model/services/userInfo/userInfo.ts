import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../entitats/implementacions/User';

@Injectable({
  providedIn: 'root'
})
export class userInfoService {
  user: User;
  token: string;
  isAdmin: boolean;
  constructor(private jwtHelper: JwtHelperService) {
  }

  getUser(){
    let info = this.jwtHelper.decodeToken(localStorage.getItem('SGaccessToken')!);
    return new User(info);
  }
  getToken(){
    let info = this.jwtHelper.decodeToken(localStorage.getItem('SGaccessToken')!);
    return localStorage.getItem('SGaccessToken')!;
  }
  getIsAdmin(){
    let info = this.jwtHelper.decodeToken(localStorage.getItem('SGaccessToken')!);
    return info.isAdmin;
  }
 

}
