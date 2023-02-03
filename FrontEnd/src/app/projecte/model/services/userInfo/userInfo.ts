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
    console.log(this.jwtHelper.decodeToken(localStorage.getItem('SGaccessToken')!));
    let info = this.jwtHelper.decodeToken(localStorage.getItem('SGaccessToken')!);
    this.user = new User(info);
    this.token = localStorage.getItem('SGaccessToken')!;
    this.isAdmin = info.isAdmin;
  }

}
