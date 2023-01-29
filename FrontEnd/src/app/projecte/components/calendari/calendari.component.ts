import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ReservarComponent } from '../reservar/reservar.component';
import {Inject} from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaApiService } from '../../model/services/guardia/guardia-api.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ca-CA'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter,useClass: MomentDateAdapter,deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}],
  encapsulation: ViewEncapsulation.None,
})
export class CalendariComponent {
  selected: Date |null = new Date();
  @ViewChild(ReservarComponent) child:ReservarComponent;
  guardiesMes: Array<Guardia>;

  constructor(private httpClient: GuardiaApiService) {
  //  this.initialize();
    this.getMonthGuardies();
  }



  initialize(){
    this.child.dia = this.selected;
    this.child.initialize();
    
  }

  getMonthGuardies(){
   // this.httpClient.getMonthGuardiesByDate(new Date()); 
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
   


      return 'special-date';
      
      // const highlightDate = this.datesToHighlight
      //   .map(strDate => new Date(strDate))
      //   .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      
      // return highlightDate ? 'special-date' : '';
    };
  }
  
}

