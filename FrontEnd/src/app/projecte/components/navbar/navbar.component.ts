import { Component } from '@angular/core';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isAdmin: boolean = false;
  constructor(private userInfo: userInfoService){
    this.isAdmin = userInfo.isAdmin;
  }

}
