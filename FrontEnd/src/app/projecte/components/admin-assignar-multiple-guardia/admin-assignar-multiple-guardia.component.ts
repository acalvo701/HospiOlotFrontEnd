import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaTreballador } from '../../model/entitats/implementacions/GuardiaTreballador';
import { Treballador } from '../../model/entitats/implementacions/Treballador';
import { AdminApiService } from '../../model/services/admin/admin-api';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-admin-assignar-multiple-guardia',
  templateUrl: './admin-assignar-multiple-guardia.component.html',
  styleUrls: ['./admin-assignar-multiple-guardia.component.scss']
})

export class AdminAssignarMultipleGuardiaComponent implements OnInit,OnDestroy {
  assignarGuardiaForm: FormGroup;

  treballadors: Array<Treballador> = [];
  guardies: Array<Guardia> = [];

  dataGuardia: Date;
  ocult: boolean = true;

  subscription!: Subscription[];
  error: string;
  valid: string;
  idTreballador: string;
  guardarId: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder, uInfo: userInfoService) {
    this.subscription = new Array<Subscription>();
    this.idTreballador = uInfo.user.id;
    //this.getTreballadorsFromGuardiaAdmin('471');
  }
  ngOnInit(): void {
    this.assignarGuardiaForm = this.fb.group({
      dataGuardia: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }

  getDataEntrada() {
    this.dataGuardia = this.assignarGuardiaForm.get("dataGuardia")?.value;
    this.selectGuardies();
  }

  async getTreballadorsFromGuardiaAdmin(idGuardia: string) {
    let prova:any = await (this.httpClient.getTreballadorsFromGuardiaAdmin(idGuardia).
    subscribe(
      {
        next: (response) => {
          prova = response.treballadors;
          console.log(this.treballadors);
          return prova;
        },
        //per veure l'error que retorna de l'api
        error: () => {

        },
        complete: () => {
        },
      }));
      return prova;
  }

  selectGuardies() {
    this.subscription.push(this.httpClient.getGuardiesByDayAdmin(this.dataGuardia, this.idTreballador).
      subscribe(
        {
          next: (response) => {
            this.guardies = response.guardies;
            this.ocult = true;
            if (this.guardies.length != 0) {
              this.ocult = false;
            }
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        }));
  }
}