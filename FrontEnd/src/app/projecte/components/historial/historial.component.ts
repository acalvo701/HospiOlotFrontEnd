import { Component, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaApiService } from '../../model/services/guardia/guardia-api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnDestroy{
  guardies: Array<Guardia> = [];
  subscription!: Subscription;
  constructor(private httpClient: GuardiaApiService) { 
    this.subscription = this.httpClient.getHistoryTreballador().subscribe(
      response => {
        this.guardies = response.historial;
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  passarMinuscules(string: string): string {
    return string.toLowerCase();
  }

  dataFlip (dateString:string) :string {
    var momentVariable = moment(dateString, 'YYYY-MM-DD');  
    return momentVariable.format('DD-MM-YYYY');   
    
    }


}
