import { Component } from '@angular/core';
import { HeaderInfoService } from '../../model/services/headerInfo/header-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  nom:string;
  categoria:string;

  constructor(header: HeaderInfoService) {
    const userInfo = header.getInfoToken();

    this.nom = userInfo.nom;
    this.categoria = userInfo.categoria;
  }
}
