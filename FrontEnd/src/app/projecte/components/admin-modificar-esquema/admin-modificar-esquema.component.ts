import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { Categoria } from '../../model/entitats/implementacions/Categoria';
import { GuardiaModel } from '../../model/entitats/implementacions/GuardiaModel';
import { GuardiaModelTreballador } from '../../model/entitats/implementacions/GuardiaModelTreballador';
import { Torn } from '../../model/entitats/implementacions/Torn';
import { Unitat } from '../../model/entitats/implementacions/Unitat';
import { AdminApiService } from '../../model/services/admin/admin-api';
import { userInfoService } from '../../model/services/userInfo/userInfo';

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
  esquemes: Array<GuardiaModelTreballador> = [];

  subscription!: Subscription[];
  error: string;
  errorAfegir: string;
  errorCrear: string;
  valid: string;
  validAfegir: string;
  validCrear: string;
  guardarId: string;
  idTreballador: string;

  mostrarAfegir: boolean = false;

  constructor(private httpClient: AdminApiService, uInfo: userInfoService) {
    this.subscription = new Array<Subscription>();
    this.idTreballador = uInfo.user.id;
    this.getNomsEsquemaByIdTreballador();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }

  canviarColorButton(num: string, vista: string = 'enabled', colorBackground: string = '#a5d051', colorBorder: string = '#7bb902') {
    let classEditar = document.getElementsByClassName(`editar_${num}`) as HTMLCollectionOf<HTMLElement>;

    Array.from(classEditar).forEach(i => {
      i.style.backgroundColor = colorBackground;
      i.style.borderColor = colorBorder;
      if (vista == 'enabled') {
        i.removeAttribute('disabled');
      }
    })
  }

  afegirEsquema() {
    const nomFormulari: any = document.getElementById(`formulariSelect`);
    let formulari: any = new FormData(nomFormulari);
    if (formulari.get('nomEsquema') != '') {

      let creacioEsquema = new GuardiaModelTreballador('', this.idTreballador, formulari.get('nomEsquema'));
      this.subscription.push(this.httpClient.insertNomEsquemaByIdTreballador(creacioEsquema).
        pipe(take(1), catchError((err: any) => {
          if (err.error.error.code == 'ER_DUP_ENTRY') {
            return throwError(() => new Error("Ja existeix aquest nom d'esquema"));
          }
          return throwError(() =>

            new Error("Error d'API"));
        }))
        .subscribe(
          {
            next: (response) => {
              this.validCrear = response.message;
            },
            //per veure l'error que retorna de l'api
            error: (err: any) => {
              this.errorCrear = err;
            },
            complete: () => {
              this.getNomsEsquemaByIdTreballador();
            },
          }));
    } else {
      this.errorCrear = "Falten camps per emplenar!";
    }
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

  obtenirEsquemaSelect() {
    const nomFormulari: any = document.getElementById(`formulariSelect`);
    let formulari: any = new FormData(nomFormulari);

    this.subscription.push(this.httpClient.getEsquemaByIdTreballadorAndName(this.idTreballador, formulari.get('esquema')).
      pipe(take(1), catchError((err: any) => {
        return throwError(() => new Error("Error d'API"));
      }))
      .subscribe(
        {
          next: (response) => {
            this.guardiesEsquema = response.esquema;
          },
          //per veure l'error que retorna de l'api
          error: (err: any) => {
            this.errorAfegir = err.error;
          },
          complete: () => {
            this.comprovarValorSelect();
            this.getAllCategories();
            this.getAllUnitats();
            this.getAllTorns();
            this.error = "";
            this.valid = "";
          },
        }));
  }

  comprovarValorSelect() {
    const nomFormulari: any = document.getElementById(`formulariSelect`);
    let formulari: any = new FormData(nomFormulari);
    if (formulari.get('esquema') == "") {
      this.mostrarAfegir = false;
    } else {
      this.mostrarAfegir = true;
    }
  }

  modificarEsquema(id: string) {
    const nomFormulari: any = document.getElementById(`formulari_${id}`);

    let formulari: any = new FormData(nomFormulari);

    let creacioGuardia = new GuardiaModel(id, formulari.get('categoria'), formulari.get('unitat'), formulari.get('torn'), formulari.get('numeroPlaces'), formulari.get('estat'), '');

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
            this.canviarColorButton(id, 'disabled', 'rgb(151, 151, 151)', 'rgb(107, 107, 107)');
          },
        }));
  }

  estatEliminatEsquemaRow(id: string) {
    const nomFormulari: any = document.getElementById(`formulari_${id}`);

    let formulari: any = new FormData(nomFormulari);

    let creacioGuardia = new GuardiaModel(id, formulari.get('categoria'), formulari.get('unitat'), formulari.get('torn'), formulari.get('numeroPlaces'), formulari.get('estat'), '');

    this.subscription.push(this.httpClient.estatEliminatEsquemaRow(creacioGuardia).
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
            this.obtenirEsquemaSelect();
          },
        }));
  }

  estatEliminatNomEsquema() {
    const selectFormulari: any = document.getElementById(`selectFormulari`);
    let idEsquema = selectFormulari.options[selectFormulari.selectedIndex].id;

    this.subscription.push(this.httpClient.estatEliminatNomEsquema(idEsquema).
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
            this.getNomsEsquemaByIdTreballador();
            this.mostrarAfegir = false;
          },
        }));
  }

  insertEsquemaRow() {
    const nomFormulari: any = document.getElementById(`formulariAfegir`);
    const selectFormulari: any = document.getElementById(`selectFormulari`);

    let formulari: any = new FormData(nomFormulari);
    let idGMT = selectFormulari.options[selectFormulari.selectedIndex].id;

    if (formulari.get('categoria') != "" && formulari.get('unitat') != "" && formulari.get('torn') != "" && formulari.get('numeroPlaces') != "" && formulari.get('estat') != "") {

      let creacioGuardia = new GuardiaModel('', formulari.get('categoria'), formulari.get('unitat'), formulari.get('torn'), formulari.get('numeroPlaces'), formulari.get('estat'), idGMT);

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
              this.obtenirEsquemaSelect();
              nomFormulari.reset();
            },
          }));
    } else {
      this.errorAfegir = "Falten camps per emplenar!";
    }
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

