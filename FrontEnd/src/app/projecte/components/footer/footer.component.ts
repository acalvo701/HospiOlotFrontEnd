import { Component } from '@angular/core';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isAdmin:boolean;
  constructor(userInfo: userInfoService) {
    this.isAdmin = userInfo.getIsAdmin();
  }
}
