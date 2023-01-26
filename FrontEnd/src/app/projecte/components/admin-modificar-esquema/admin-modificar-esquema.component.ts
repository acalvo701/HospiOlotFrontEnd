import { Component, OnDestroy } from '@angular/core';
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
export class AdminModificarEsquemaComponent implements OnDestroy {

  guardiesEsquema: Array<GuardiaModel> = [];
  categories: Array<Categoria> = [];
  unitats: Array<Unitat> = [];
  torns: Array<Torn> = [];

  subscription!: Subscription[];
  error: string;
  errorAfegir: string;
  valid: string;
  validAfegir: string;
  guardarId: string;

  constructor(private httpClient: AdminApiService) {
    this.subscription = new Array<Subscription>();

    this.getGuardiesEsquema();
    this.getAllCategories();
    this.getAllUnitats();
    this.getAllTorns();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }

  modificarEsquema(id: string) {
    const nomFormulari: any = document.getElementById(`formulari_${id}`);

    let formulari: any = new FormData(nomFormulari);

    let creacioGuardia = new GuardiaModel(id, formulari.get('categoria'), formulari.get('unitat'), formulari.get('torn'), formulari.get('numeroPlaces'), formulari.get('estat'));

    this.subscription.push(this.httpClient.updateEsquemaRow(creacioGuardia).
      pipe(take(1), catchError((err: any) => {
        return throwError(() => new Error("Error d'API"));
      }))
      .subscribe(
        {
          next: (response) => {
            this.valid = response.message;
            this.guardarId = id;
          },
          //per veure l'error que retorna de l'api
          error: (err: any) => {
            this.error = err.error;
          },
          complete: () => {

          },
        }));
  }

  eliminarEsquema(id: string) {
    const nomFormulari: any = document.getElementById(`formulari_${id}`);

    let formulari: any = new FormData(nomFormulari);

    let creacioGuardia = new GuardiaModel(id, formulari.get('categoria'), formulari.get('unitat'), formulari.get('torn'), formulari.get('numeroPlaces'), formulari.get('estat'));

    this.subscription.push(this.httpClient.deleteEsquemaRow(creacioGuardia).
      pipe(take(1), catchError((err: any) => {
        return throwError(() => new Error("Error d'API"));
      }))
      .subscribe(
        {
          next: () => {

          },
          //per veure l'error que retorna de l'api
          error: (err: any) => {
            this.error = err.error;
          },
          complete: () => {
            this.getGuardiesEsquema();
            this.getAllCategories();
            this.getAllUnitats();
            this.getAllTorns();
          },
        }));
  }

  afegirEsquema() {
    const nomFormulari: any = document.getElementById(`formulariAfegir`);

    let formulari: any = new FormData(nomFormulari);

    if (formulari.get('categoria') != "" && formulari.get('unitat') != "" && formulari.get('torn') != "" && formulari.get('numeroPlaces') != "" && formulari.get('estat') != "") {

      let creacioGuardia = new GuardiaModel('', formulari.get('categoria'), formulari.get('unitat'), formulari.get('torn'), formulari.get('numeroPlaces'), formulari.get('estat'));

      this.subscription.push(this.httpClient.insertEsquemaRow(creacioGuardia).
        pipe(take(1), catchError((err: any) => {
          return throwError(() => new Error("Error d'API"));
        }))
        .subscribe(
          {
            next: (response) => {
              this.validAfegir = response.message;
            },
            //per veure l'error que retorna de l'api
            error: (err: any) => {
              this.errorAfegir = err.error;
            },
            complete: () => {
              this.getGuardiesEsquema();
              this.getAllCategories();
              this.getAllUnitats();
              this.getAllTorns();
            },
          }));
    } else {
      this.errorAfegir = "Falten camps per emplenar!";
    }
  }

  getGuardiesEsquema() {
    this.subscription.push(this.httpClient.getGuardiesEsquema().
      subscribe(
        {
          next: (response) => {
            this.guardiesEsquema = response;
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        }));
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
    this.subscription.push(this.httpClient.getAllUnitats().
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
