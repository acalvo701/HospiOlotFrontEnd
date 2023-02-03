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
  assignarGuardiaForm: FormGroup;

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

  constructor(private httpClient: AdminApiService, private fb: FormBuilder, uInfo: userInfoService) {
    this.subscription = new Array<Subscription>();
    this.idTreballador = uInfo.getUser().id;
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

  getTreballadorsFromGuardiaAdmin(idGuardia: string) {
    return this.guardiesReformed.get(idGuardia)?.treballadors;
  }

  selectGuardies() {
    this.httpClient.getGuardiesByDayAdmin(this.dataGuardia, this.idTreballador).
      subscribe(response => {
        this.guardies = response.guardies;
        this.guardiesReformed = this.reformarGuardies();
        this.guardies = this.eliminarDuplicatsGuardies();
        console.log(this.guardiesReformed);
        this.ocult = true;
        if (this.guardies.length != 0) {
          this.ocult = false;
        }

      });
  }

  eliminarDuplicatsGuardies(){
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
        let treballadorNou = { idGuardia: guardia.idGuardia, idTreballador: guardia.idTreballador, estatTreballador: guardia.estatTreballador }
        valors!.treballadors.push(treballadorNou);
        reforming.set(guardia.id, valors);
      } else {
        let valors = {
          id: guardia.id, categoria: guardia.categoria, unitat: guardia.unitat, torn: guardia.torn, dia: guardia.dia, numeroPlaces: guardia.numeroPlaces,
          treballadors: new Array<treballadorMinified>(
            {
              idGuardia: guardia.idGuardia,
              idTreballador: guardia.idTreballador,
              estatTreballador: guardia.estatTreballador
            }

          )};
          reforming.set(guardia.id, valors);

        }
      });

    return reforming;
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
  idTreballador: string,
  estatTreballador: string
}