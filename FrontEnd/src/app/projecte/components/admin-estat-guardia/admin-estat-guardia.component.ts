import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { AdminApiService } from '../../model/services/admin/admin-api';
import { catchError, Subscription, take, throwError } from 'rxjs';

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

  subscription: Subscription;
  error: string;
  valid: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.estatGuardiaForm = this.fb.group({
      dataGuardia: ['', Validators.required],
      idGuardia: ['', Validators.required],
      estat: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

    this.subscription = this.httpClient.updateEstatGuardiaAdmin(estatGuardia).
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
        });

    this.ocult = true;
    this.estatGuardiaForm.reset();
  }
}