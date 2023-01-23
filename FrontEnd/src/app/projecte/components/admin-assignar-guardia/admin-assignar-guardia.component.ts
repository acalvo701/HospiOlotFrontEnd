import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { Treballador } from '../../model/entitats/implementacions/Treballador';
import { AdminApiService } from '../../model/services/admin/admin-api';

@Component({
  selector: 'app-admin-assignar-guardia',
  templateUrl: './admin-assignar-guardia.component.html',
  styleUrls: ['./admin-assignar-guardia.component.css']
})
export class AdminAssignarGuardiaComponent implements OnInit {

  treballadors: Array<Treballador> = [];
  guardies: Array<Guardia> = [];
  dataGuardia: Date;

  guardiaForm: FormGroup;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder) {

    this.httpClient.getAllTreballadors().subscribe(
      response => {
        console.log(response);
        this.treballadors = response.treballadors;
      }
    )
  }

  ngOnInit(): void {
    this.guardiaForm = this.fb.group({
      dataGuardia: [null],
      guardia: [null],
      estat: [null]
    })
  }

  getDataEntrada() {
    this.dataGuardia = this.guardiaForm.get("dataGuardia")?.value;
    this.selectGuardies();
  }

  selectGuardies() {
    this.httpClient.getGuardiesByDay(this.dataGuardia).subscribe(
      response => {
        console.log(response);
        this.guardies = response.guardies;
      }
    )
  }

  assignarGuardia() {
    

    this.httpClient.insertarGuardiaTreballadorAdmin(this.guardiaForm.get("idTreballador")?.value,this.guardiaForm.get("idGuardia")?.value,this.guardiaForm.get("estat")?.value).subscribe(
      response => {
        console.log(response);
        this.guardies = response.guardies;
      }
    )
  }
}
