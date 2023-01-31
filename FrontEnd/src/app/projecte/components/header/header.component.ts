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

  constructor(header: userInfoService) {
    const userInfo = header.getInfoToken();
    this.nom = userInfo.nom;
    this.categoria = userInfo.categoria;
  }
}
