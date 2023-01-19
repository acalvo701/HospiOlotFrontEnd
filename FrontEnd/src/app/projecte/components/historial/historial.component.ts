import { Component, OnInit } from '@angular/core';
import { Guardia } from '../../model/entitats/implementacions/Guardia';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  guardies: Array<Guardia> = [];
  constructor() { 
    this.guardies.push(new Guardia("01/01/2022", 'Auxiliar', 'pendent', 'dia', 'ucies'));
    this.guardies.push(new Guardia("20/01/2022", 'Auxiliar','assignada', 'nit', 'unitat1'));
    this.guardies.push(new Guardia("22/01/2022", 'Infermer','pendent', 'dia', 'unitat2'));
    this.guardies.push(new Guardia("22/01/2022", 'Infermer','pendent', 'nit', 'unitat3'));
    this.guardies.push(new Guardia("22/01/2022", 'Infermer','assignada', 'nit', 'unitat4'));

    
  }

  ngOnInit(): void {
  }

}
