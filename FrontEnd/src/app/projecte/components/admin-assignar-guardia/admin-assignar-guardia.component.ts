import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaTreballador } from '../../model/entitats/implementacions/GuardiaTreballador';
import { Treballador } from '../../model/entitats/implementacions/Treballador';
import { AdminApiService } from '../../model/services/admin/admin-api';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-admin-assignar-guardia',
  templateUrl: './admin-assignar-guardia.component.html',
  styleUrls: ['./admin-assignar-guardia.component.scss']
})

export class AdminAssignarGuardiaComponent implements OnInit, OnDestroy {
  assignarGuardiaForm: FormGroup;

  treballadors: Array<Treballador> = [];
  guardies: Array<Guardia> = [];

  dataGuardia: Date;
  ocult: boolean = true;

  subscription!: Subscription[];
  error: string;
  valid: string;
  idTreballador: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder, uInfo: userInfoService) {
    this.subscription = new Array<Subscription>();
    this.idTreballador = uInfo.user.id;
    this.getAllTreballadors();
  }

  ngOnInit(): void {
    this.assignarGuardiaForm = this.fb.group({
      idTreballador: ['', Validators.required],
      dataGuardia: ['', Validators.required],
      idGuardia: ['', Validators.required],
      estat: ['', Validators.required]
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

  assignarGuardia() {

    let assignarGuardia = new GuardiaTreballador(this.assignarGuardiaForm.get("idTreballador")?.value, this.assignarGuardiaForm.get("idGuardia")?.value, this.assignarGuardiaForm.get("estat")?.value);

    this.subscription.push(this.httpClient.insertarGuardiaTreballadorAdmin(assignarGuardia).
      pipe(take(1), catchError((err: any) => {
        return throwError(() => new Error("Error d'API"))
      }))
      .subscribe(
        {
          next: (response) => {
            this.guardies = response.guardies;
            this.valid = response.message;
          },
          //per veure l'error que retorna de l'api
          error: (err: any) => {
            this.error = err.error;
          },
          complete: () => {

          },
        }));

    this.ocult = true;
    this.assignarGuardiaForm.reset();
  }

  getAllTreballadors() {
    this.subscription.push(this.httpClient.getAllTreballadors().
      subscribe(
        {
          next: (response) => {
            this.treballadors = response.treballadors;
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        }));
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