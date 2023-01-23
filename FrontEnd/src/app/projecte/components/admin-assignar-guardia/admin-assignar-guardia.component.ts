import { Component } from '@angular/core';
import { AdminApiService } from '../../model/services/admin/admin-api';

@Component({
  selector: 'app-admin-assignar-guardia',
  templateUrl: './admin-assignar-guardia.component.html',
  styleUrls: ['./admin-assignar-guardia.component.css']
})
export class AdminAssignarGuardiaComponent {
   treba
  constructor(private httpClient: AdminApiService) { 

    this.httpClient.getAllTreballadors().subscribe(
      response => {
        console.log(response);
        this.treballadors = response.historial;
      }
    )
  }

}
