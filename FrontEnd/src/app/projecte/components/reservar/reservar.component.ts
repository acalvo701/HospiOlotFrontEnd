import { Component, EventEmitter, Input, Output } from '@angular/core';
import moment from 'moment';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaApiService } from '../../model/services/guardia/guardia-api.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.scss']
})
export class ReservarComponent {
  guardies: Array<Guardia> = [];
  guardiesReformades: reformat = {};
  lesMevesGuardies: Array<Guardia> = [];
  @Input() dia: Date | null; // decorate the property with @Input()
  @Output("getAllGuardies") getAllGuardies: EventEmitter<any> = new EventEmitter();
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private httpClient: GuardiaApiService) {
    this.initialize();
  }


  initialize() {
    let dia = (moment(this.dia)).format('YYYY-MM-DD');
    this.httpClient.getGuardiesByDay(dia).subscribe(
      response => {
        this.guardies = response.guardies;
        this.guardiesReformades = this.tractarGuardies();
        this.getAllGuardies.emit();
        if(this.guardies.length > 0){
          (document.getElementsByTagName("app-reservar") as HTMLCollectionOf<HTMLElement>)[0].style.display = "block";
        }else{
          (document.getElementsByTagName("app-reservar") as HTMLCollectionOf<HTMLElement>)[0].style.display = "none";
        }

        this.getLesMevesGuardies();
      }
    )

  }

  getLesMevesGuardies() {


    let dia = (moment(this.dia)).format('YYYY-MM-DD')
    this.httpClient.getGuardiesByDayFromTreballador(dia).subscribe(
      response => {
        this.lesMevesGuardies = (response.guardies);

      }
    )

    this.httpClient.getGuardiesByDay(dia).subscribe(
      response => {
        this.guardies = response.guardies;
      }
    )

  }


  tractarGuardies() {

    let reformado = {} as reformat;

    this.guardies.forEach(guardia => {
      let categoria: string = guardia.categoria;
      let unitat: string = guardia.unitat;
      let torn: string = guardia.torn;

      if (reformado[categoria] == undefined) {
        reformado[categoria] = {}
      }

      if (reformado[categoria][unitat] == undefined) {
        reformado[categoria][unitat] = {}
      }

      reformado[categoria][unitat][torn] = {
        nom: torn,
        guardia: guardia,
      }



    });

    return reformado;
  }

  reservarGuardia(idGuardia: string) {
    this.httpClient.reservarGuardia(idGuardia).subscribe(
      response => {

        this.guardies = response.guardies;

        if (this.guardies && this.guardies.length > 0) {

          this.guardiesReformades = this.tractarGuardies();
        }
        this.getLesMevesGuardies();
        this.getAllGuardies.emit();
      }
    )

  }

  guardiaReservada(idGuardia: string) {
    return this.lesMevesGuardies.find(guardia => guardia.id === idGuardia) != undefined;

  }

  getPersonesApuntades(idGuardia: string) {
    let guardiaTrobada = this.guardies.find(guardia => guardia.id === idGuardia);
    if (guardiaTrobada != undefined) {

      return guardiaTrobada.personesApuntades;
    }

    return 0;


  }

  cancelarGuardia(idGuardia: string) {
    this.httpClient.cancelarGuardia(idGuardia).subscribe(
      response => {

        this.getLesMevesGuardies();
        this.getAllGuardies.emit();
      }
    )


  }


  log(variable: any) {
  }
}

interface reformat {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        nom: string,
        guardia: Guardia,
      },
    }

  }
};
