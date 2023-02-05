import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaModel } from '../../model/entitats/implementacions/GuardiaModel';
import { GuardiaModelTreballador } from '../../model/entitats/implementacions/GuardiaModelTreballador';
import { AdminApiService } from '../../model/services/admin/admin-api';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-admin-generar-guardies-esquema',
  templateUrl: './admin-generar-guardies-esquema.component.html',
  styleUrls: ['./admin-generar-guardies-esquema.component.scss']
})
export class AdminGenerarGuardiesEsquemaComponent {
  generarGuardiesForm: FormGroup;

  guardies: Array<Guardia>;
  guardiesEsquema: Array<GuardiaModel>;
  esquemes: Array<GuardiaModelTreballador> = [];

  subscription!: Subscription[];
  error: string;
  valid: string;
  idTreballador: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder, uInfo: userInfoService) {
    this.subscription = new Array<Subscription>();
    this.idTreballador = uInfo.getUser().id;
    this.getNomsEsquemaByIdTreballador();
  }

  ngOnInit(): void {
    this.generarGuardiesForm = this.fb.group({
      diaInici: ['', Validators.required],
      diaFi: ['', Validators.required],
      nomEsquema: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }

  getNomsEsquemaByIdTreballador() {
    this.subscription.push(this.httpClient.getNomsEsquemaByIdTreballador(this.idTreballador).
      subscribe(
        {
          next: (response) => {
            this.esquemes = response.esquema;
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        }));
  }

  generarGuardiesEsquema() {
    const selectFormulari: any = document.getElementById(`selectFormulari`);
    let idGMT = selectFormulari.options[selectFormulari.selectedIndex].id;

    this.httpClient.generarGuardiesEsquema(this.generarGuardiesForm.get("diaInici")?.value, this.generarGuardiesForm.get("diaFi")?.value, idGMT).
      subscribe(
        {
          next: (response: any) => {
            this.valid = response.message;

          },
          //per veure l'error que retorna de l'api
          error: (err: any) => {
            this.error = err.error;

          },
          complete: () => {

          },
        });
    this.generarGuardiesForm.reset();
  }
}