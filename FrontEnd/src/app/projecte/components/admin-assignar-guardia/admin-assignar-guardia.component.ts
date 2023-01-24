import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaTreballador } from '../../model/entitats/implementacions/GuardiaTreballador';
import { Treballador } from '../../model/entitats/implementacions/Treballador';
import { AdminApiService } from '../../model/services/admin/admin-api';

@Component({
  selector: 'app-admin-assignar-guardia',
  templateUrl: './admin-assignar-guardia.component.html',
  styleUrls: ['./admin-assignar-guardia.component.scss']
})

export class AdminAssignarGuardiaComponent implements OnInit {
  assignarGuardiaForm: FormGroup;

  treballadors: Array<Treballador> = [];
  guardies: Array<Guardia> = [];

  dataGuardia: Date;
  ocult: boolean = true;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder) {

    this.httpClient.getAllTreballadors().subscribe(
      response => {
        console.log(response);
        this.treballadors = response.treballadors;
      }
    )
  }

  ngOnInit(): void {
    this.assignarGuardiaForm = this.fb.group({
      idTreballador: ['', Validators.required],
      dataGuardia: ['', Validators.required],
      idGuardia: ['', Validators.required],
      estat: ['', Validators.required]
    })
  }

  getDataEntrada() {
    this.dataGuardia = this.assignarGuardiaForm.get("dataGuardia")?.value;
    this.selectGuardies();
    this.ocult = false;
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

   let assignarGuardia = new GuardiaTreballador(this.assignarGuardiaForm.get("idTreballador")?.value, this.assignarGuardiaForm.get("idGuardia")?.value, this.assignarGuardiaForm.get("estat")?.value);

    this.httpClient.insertarGuardiaTreballadorAdmin(assignarGuardia).subscribe(
      response => {
        console.log(response);
        this.guardies = response.guardies;
      }
    )
    this.ocult = true;
    this.assignarGuardiaForm.reset();
  }
}