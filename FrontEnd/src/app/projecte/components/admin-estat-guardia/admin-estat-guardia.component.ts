import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { AdminApiService } from '../../model/services/admin/admin-api';

@Component({
  selector: 'app-admin-estat-guardia',
  templateUrl: './admin-estat-guardia.component.html',
  styleUrls: ['./admin-estat-guardia.component.scss']
})
export class AdminEstatGuardiaComponent implements OnInit {
  estatGuardiaForm: FormGroup;

  guardies: Array<Guardia> = [];

  dataGuardia: Date;
  ocult: boolean = true;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.estatGuardiaForm = this.fb.group({
      dataGuardia: ['', Validators.required],
      idGuardia: ['', Validators.required],
      estat: ['', Validators.required]
    })
  }

  getDataEntrada() {
    this.dataGuardia = this.estatGuardiaForm.get("dataGuardia")?.value;
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

  estatGuardia() {

    let estatGuardia = new Guardia(this.estatGuardiaForm.get("idGuardia")?.value, this.estatGuardiaForm.get("dataGuardia")?.value, '', this.estatGuardiaForm.get("estat")?.value, '', '');

    this.httpClient.updateEstatGuardiaAdmin(estatGuardia).subscribe(
      response => {
        console.log(response);
      }
    );
    this.ocult = true;
    this.estatGuardiaForm.reset();
  }
}
