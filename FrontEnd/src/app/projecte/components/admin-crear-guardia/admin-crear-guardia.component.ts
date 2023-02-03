import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { Categoria } from '../../model/entitats/implementacions/Categoria';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { Torn } from '../../model/entitats/implementacions/Torn';
import { Unitat } from '../../model/entitats/implementacions/Unitat';
import { AdminApiService } from '../../model/services/admin/admin-api';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-admin-crear-guardia',
  templateUrl: './admin-crear-guardia.component.html',
  styleUrls: ['./admin-crear-guardia.component.scss']
})
export class AdminCrearGuardiaComponent implements OnInit, OnDestroy {
  crearGuardiaForm: FormGroup;

  categories: Array<Categoria> = [];
  unitats: Array<Unitat> = [];
  torns: Array<Torn> = [];

  subscription!: Subscription[];
  error: string;
  valid: string;
  idTreballador: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder, uInfo: userInfoService) {
    this.subscription = new Array<Subscription>();
    this.idTreballador = uInfo.getUser().id;
    this.getAllCategories();
    this.getAllUnitats();
    this.getAllTorns();
  }

  ngOnInit(): void {
    this.crearGuardiaForm = this.fb.group({
      categoria: ['', Validators.required],
      unitat: ['', Validators.required],
      torn: ['', Validators.required],
      dataGuardia: ['', Validators.required],
      numeroPlaces: ['', Validators.required],
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }

  crearGuardia() {

    let creacioGuardia = new Guardia('', this.crearGuardiaForm.get("dataGuardia")?.value, this.crearGuardiaForm.get("categoria")?.value, 'ACTIU', this.crearGuardiaForm.get("torn")?.value, this.crearGuardiaForm.get("unitat")?.value, this.crearGuardiaForm.get("numeroPlaces")?.value);

    this.subscription.push(this.httpClient.insertGuardia(creacioGuardia).
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

    this.crearGuardiaForm.reset();
  }

  getAllCategories() {
    this.subscription.push(this.httpClient.getAllCategories().
      subscribe(
        {
          next: (response) => {
            this.categories = response.categories;
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        }));
  }

  getAllUnitats() {
    this.subscription.push(this.httpClient.getUnitatsByIdTreballador(this.idTreballador).
      subscribe(
        {
          next: (response) => {
            this.unitats = response.unitats;
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        }));
  }

  getAllTorns() {
    this.subscription.push(this.httpClient.getAllTorns().
      subscribe(
        {
          next: (response) => {
            this.torns = response.torns;
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        }));
  }
}