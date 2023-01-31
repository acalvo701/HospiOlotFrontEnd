import { Component, ViewEncapsulation } from '@angular/core';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-admin-main-screen',
  templateUrl: './admin-main-screen.component.html',
  styleUrls: ['./admin-main-screen.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class AdminMainScreenComponent {

  rol:string;

  constructor(uInfo: userInfoService) {

    this.rol = uInfo.user.categoria;
  }

}