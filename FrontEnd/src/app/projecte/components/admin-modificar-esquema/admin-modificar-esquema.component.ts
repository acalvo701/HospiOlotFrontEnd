import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { Categoria } from '../../model/entitats/implementacions/Categoria';
import { GuardiaModel } from '../../model/entitats/implementacions/GuardiaModel';
import { Torn } from '../../model/entitats/implementacions/Torn';
import { Unitat } from '../../model/entitats/implementacions/Unitat';
import { AdminApiService } from '../../model/services/admin/admin-api';

@Component({
  selector: 'app-admin-modificar-esquema',
  templateUrl: './admin-modificar-esquema.component.html',
  styleUrls: ['./admin-modificar-esquema.component.scss']
})
export class AdminModificarEsquemaComponent implements OnInit, OnDestroy {
modificarEsquemaForm: FormGroup;

  guardiesEsquema: Array<GuardiaModel> = [];
  categories: Array<Categoria> = [];
  unitats: Array<Unitat> = [];
  torns: Array<Torn> = [];
  
  subscription!: Subscription;
  error: string;
  valid: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder) { 
    this.httpClient.getGuardiesEsquema().subscribe(
      response => {
        console.log(response);
        this.guardiesEsquema = response;
      }
    )
    this.httpClient.getAllCategories().subscribe(
      response => {
        this.categories = response.categories;
      }
    )
    this.httpClient.getAllUnitats().subscribe(
      response => {
        this.unitats = response.unitats;
      }
    )

    this.httpClient.getAllTorns().subscribe(
      response => {
        this.torns = response.torns;
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.modificarEsquemaForm = this.fb.group({
      categoria: [''],
      unitat: [''],
      torn: [''],
      numeroPlaces: [],
      estat: ['']
    })
  }
  modificarEsquema(id: string){
console.log(this.modificarEsquemaForm);

    let creacioGuardia = new GuardiaModel(id, this.modificarEsquemaForm.get("categoria")?.value, this.modificarEsquemaForm.get("unitat")?.value, this.modificarEsquemaForm.get("torn")?.value, this.modificarEsquemaForm.get("numeroPlaces")?.value, this.modificarEsquemaForm.get("estat")?.value);

    this.subscription = this.httpClient.updateEsquemaRow(creacioGuardia).
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
  }
}
