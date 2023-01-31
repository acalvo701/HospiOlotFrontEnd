import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../entitats/implementacions/User';

@Injectable({
  providedIn: 'root'
})
export class userInfoService {
  user: User;
  constructor(private jwtHelper: JwtHelperService) {
    console.log(this.jwtHelper.decodeToken(localStorage.getItem('SGaccessToken')!));
    this.user = new User(this.jwtHelper.decodeToken(localStorage.getItem('SGaccessToken')!));
  }

}
