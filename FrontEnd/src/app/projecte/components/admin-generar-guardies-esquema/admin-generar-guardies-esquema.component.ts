import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaModel } from '../../model/entitats/implementacions/GuardiaModel';
import { AdminApiService } from '../../model/services/admin/admin-api';

@Component({
  selector: 'app-admin-generar-guardies-esquema',
  templateUrl: './admin-generar-guardies-esquema.component.html',
  styleUrls: ['./admin-generar-guardies-esquema.component.scss']
})
export class AdminGenerarGuardiesEsquemaComponent {
  generarGuardiesForm: FormGroup;

  guardies: Array<Guardia>;
  guardiesEsquema: Array<GuardiaModel>;

  subscription!: Subscription[];
  error: string;
  valid: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder) {
    this.subscription = new Array<Subscription>();
  }

  ngOnInit(): void {
    this.generarGuardiesForm = this.fb.group({
      diaInici: ['', Validators.required],
      diaFi: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }

  generarGuardiesEsquema() {
    this.httpClient.generarGuardies(this.generarGuardiesForm.get("diaInici")?.value, this.generarGuardiesForm.get("diaFi")?.value).
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