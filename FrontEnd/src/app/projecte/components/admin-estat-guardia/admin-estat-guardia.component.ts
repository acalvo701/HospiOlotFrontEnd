import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { AdminApiService } from '../../model/services/admin/admin-api';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-admin-estat-guardia',
  templateUrl: './admin-estat-guardia.component.html',
  styleUrls: ['./admin-estat-guardia.component.scss']
})
export class AdminEstatGuardiaComponent implements OnInit, OnDestroy {
  estatGuardiaForm: FormGroup;

  guardies: Array<Guardia> = [];

  dataGuardia: Date;
  ocult: boolean = true;

  subscription!: Subscription[];
  error: string;
  valid: string;
  idTreballador: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder, uInfo: userInfoService) {
    this.subscription = new Array<Subscription>();
    this.idTreballador = uInfo.getUser().id
  }

  ngOnInit(): void {
    this.estatGuardiaForm = this.fb.group({
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
    this.dataGuardia = this.estatGuardiaForm.get("dataGuardia")?.value;
    this.selectGuardies();
    
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

  estatGuardia() {
    let estatGuardia = new Guardia(this.estatGuardiaForm.get("idGuardia")?.value, this.estatGuardiaForm.get("dataGuardia")?.value, '', this.estatGuardiaForm.get("estat")?.value, '', '');

    this.subscription.push(this.httpClient.updateEstatGuardiaAdmin(estatGuardia).
      pipe(take(1), catchError((err: any) => {
        return throwError(() => new Error("Error d'API"))
      }))
      .subscribe(
        {
          next: (response) => {
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
    this.estatGuardiaForm.reset();
  }
}