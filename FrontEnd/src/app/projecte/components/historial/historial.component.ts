import { Component, OnInit } from '@angular/core';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaApiService } from '../../model/services/guardia/guardia-api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  guardies: Array<Guardia> = [];
  constructor(private httpClient: GuardiaApiService) { 
    /*this.guardies.push(new Guardia("01/01/2022", 'Auxiliar', 'pendent', 'dia', 'ucies'));
    this.guardies.push(new Guardia("20/01/2022", 'Auxiliar','assignada', 'nit', 'unitat1'));
    this.guardies.push(new Guardia("22/01/2022", 'Infermer','pendent', 'dia', 'unitat2'));
    this.guardies.push(new Guardia("22/01/2022", 'Infermer','pendent', 'nit', 'unitat3'));
    this.guardies.push(new Guardia("22/01/2022", 'Infermer','assignada', 'nit', 'unitat4'));
    */
    this.httpClient.getHistoryTreballador(8).subscribe(
      response => {
        console.log(response);
        this.guardies = response.historial;
      }
    )
  }

  passarMinuscules(string: string): string {
    return string.toLowerCase();
  }


}
