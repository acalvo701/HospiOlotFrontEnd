import { Component, Input} from '@angular/core';
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
  @Input() dia: Date; // decorate the property with @Input()
  


  constructor(private httpClient: GuardiaApiService) {
    this.initialize();

  }


  initialize(){
    let dia = (moment(this.dia)).format('YYYY-MM-DD');
    this.httpClient.getGuardiesByDay(dia).subscribe(
      response => {
        this.guardies = response.guardies;
        this.guardiesReformades = this.tractarGuardies();
        this.getLesMevesGuardies();
      }
    )
   
  }

  getLesMevesGuardies() {
    let dia = (moment(this.dia)).format('YYYY-MM-DD')
    this.httpClient.getGuardiesByDayFromTreballador(dia).subscribe(
      response => {
        this.lesMevesGuardies = (response.guardies);
        
        console.log(this.guardies);
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
        console.log(response);
        this.guardies = response.guardies;

        if (this.guardies && this.guardies.length > 0) {

          this.guardiesReformades = this.tractarGuardies();
        }
        this.getLesMevesGuardies();
      }
    )

  }

  guardiaReservada(idGuardia:string){
    return this.lesMevesGuardies.find(guardia => guardia.id === idGuardia) != undefined;

  }

  getPersonesApuntades(idGuardia:string){
    let guardiaTrobada = this.lesMevesGuardies.find(guardia => guardia.id === idGuardia);
    if(guardiaTrobada != undefined){

      return guardiaTrobada.personesApuntades;
    }

    return 0;


  }

  cancelarGuardia(idGuardia: string) {
    this.httpClient.cancelarGuardia(idGuardia).subscribe(
      response => {
        console.log(response);
        
        this.getLesMevesGuardies();
      }
    )

  
  }


  log(variable: any) {
    console.log(variable);
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
