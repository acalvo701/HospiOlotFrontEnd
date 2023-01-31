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

    this.nom = header.user.nom;
    this.categoria = header.user.categoria;
  }
}
