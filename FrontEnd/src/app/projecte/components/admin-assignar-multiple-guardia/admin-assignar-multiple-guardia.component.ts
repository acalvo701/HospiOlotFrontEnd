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

export class AdminAssignarMultipleGuardiaComponent implements OnInit, OnDestroy {

  assignarMultipleGuardiaDataForm: FormGroup;
  assignarMultipleGuardiaForm: FormGroup;

  treballadors: Array<Treballador> = [];
  guardies: Array<Guardia> = [];
  guardiesReformed: Map<string, infoGuardia>;

  dataGuardia: Date;
  ocult: boolean = true;

  subscription!: Subscription[];
  error: string;
  valid: string;
  idTreballador: string;

  guardarId: string;
  innerId: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder, uInfo: userInfoService) {
    this.subscription = new Array<Subscription>();
    this.idTreballador = uInfo.getUser().id;
  }

  ngOnInit(): void {
    this.assignarMultipleGuardiaDataForm = this.fb.group({
      dataGuardia: ['', Validators.required]
    })

    this.assignarMultipleGuardiaForm = this.fb.group({
      estatGuardia: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }

  getDataEntrada() {
    this.dataGuardia = this.assignarMultipleGuardiaDataForm.get("dataGuardia")?.value;
    this.selectGuardies();
  }

  getTreballadorsFromGuardiaAdmin(idGuardia: string) {

    return this.guardiesReformed.get(idGuardia)?.treballadors;
  }

  selectGuardies() {
    this.httpClient.getGuardiesByDayAdmin(this.dataGuardia, this.idTreballador).
      subscribe(response => {
        this.guardies = response.guardies;
        this.guardiesReformed = this.reformarGuardies();
        this.guardies = this.eliminarDuplicatsGuardies();
        this.ocult = true;
        if (this.guardies.length != 0) {
          this.ocult = false;
        }

      });
  }

  eliminarDuplicatsGuardies() {
    return this.guardies.filter((value, index, self) =>
      self.findIndex(v => v.id === value.id) === index
    );
  }


  reformarGuardies() {
    let guardiesNormals = this.guardies;
    let reforming = new Map<string, infoGuardia>;
    Object.values(guardiesNormals).forEach((guardia: any) => {

      if (reforming.has(guardia.id)) {
        let valors: any = reforming.get(guardia.id);
        let treballadorNou = { idGuardia: guardia.idGuardia, idTreballador: guardia.idTreballador, estatTreballador: guardia.estatTreballador, nomTreballador: guardia.nom }
        valors!.treballadors.push(treballadorNou);
        reforming.set(guardia.id, valors);
      } else {
        let array: Array<treballadorMinified>;
        if (guardia.estatTreballador == null) {
          array = []
        } else {
          array = new Array<treballadorMinified>(
            {
              idGuardia: guardia.idGuardia,
              idTreballador: guardia.idTreballador,
              estatTreballador: guardia.estatTreballador,
              nomTreballador: guardia.nom,
            });
        }

        let valors = {
          id: guardia.id, categoria: guardia.categoria, unitat: guardia.unitat, torn: guardia.torn, dia: guardia.dia, numeroPlaces: guardia.numeroPlaces,
          treballadors: array


        };
        reforming.set(guardia.id, valors);

      }
    });

    return reforming;
  }


  canviarEstatGuardiaTreballador(idTreballador: string, idGuardia: string) {

    this.guardarId = idGuardia;
    let estatGuardia = new GuardiaTreballador(idTreballador, idGuardia, this.assignarMultipleGuardiaForm.get("estatGuardia")?.value);

    this.subscription.push(this.httpClient.updateEstatGuardiaTreballador(estatGuardia).
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
            this.selectGuardies();
          },
        }));
  }

  tt(guardiaId: string) {
    this.innerId = guardiaId;
  }

}


export type infoGuardia = {
  id: any;
  categoria: any;
  unitat: any;
  torn: any;
  dia: any;
  numeroPlaces: any;
  treballadors: treballadorMinified[];
}

export type treballadorMinified = {
  idGuardia: string;
  idTreballador: string;
  estatTreballador: string;
  nomTreballador: string;
}