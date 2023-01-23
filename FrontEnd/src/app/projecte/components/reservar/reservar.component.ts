import { Component, Input } from '@angular/core';
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
  guardiesReformades: {};
  @Input() dia: Date; // decorate the property with @Input()


  constructor(private httpClient: GuardiaApiService) {
    let dia = (moment(this.dia)).format('YYYY-MM-DD')
    this.httpClient.getGuardiesByDay(dia).subscribe(
      response => {
        console.log(response);
        this.guardies = response.guardies;

        if (this.guardies && this.guardies.length > 0) {

          this.guardiesReformades = this.tractarGuardies();
        }

      }
    )
  }
 
  log(variable:any){
    console.log(variable);

  }
  tractarGuardies() {

    interface reformat {
      [key: string]: {
        [key: string]: {
          [key: string]: {
            nom: string,
            guardiaf: Guardia,
          },
        }

      }
    };

    let reformado = {} as reformat;

    this.guardies.forEach(guardia => {
      let categoria: string = guardia.categoria;
      let unitat: string = guardia.unitat;
      let torn: string = guardia.torn;

      if(reformado[categoria]==undefined){
        reformado[categoria] = {}
      }
      
      if(reformado[categoria][unitat] == undefined){
        reformado[categoria][unitat] = {}
      }
      
      reformado[categoria][unitat][torn] = {
        nom: torn,
        guardiaf: guardia,
      }



    });
    console.log(Object.entries(reformado));
    return reformado;



  }


}
