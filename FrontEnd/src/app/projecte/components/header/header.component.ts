import { Component } from '@angular/core';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  nom:string;
  categoria:string;
  isAdmin:boolean;
  constructor(userInfo: userInfoService) {
    this.nom = userInfo.getUser().nom
    this.categoria = userInfo.getUser().categoria
    this.isAdmin = userInfo.getIsAdmin();
  }

  ngOnInit(){

  }
}
