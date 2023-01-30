import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ReservarComponent } from '../reservar/reservar.component';
import { Inject } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, } from '@angular/material-moment-adapter';
import { DateAdapter, NativeDateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
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
import { formatDate } from '@angular/common';

class PickDateAdapter extends NativeDateAdapter {

  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'yyyy-MM-dd', this.locale);;
    } else {
      return date.toDateString();
    }
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }

}

@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ca-CA' },
    { provide: DateAdapter, useClass: PickDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
  encapsulation: ViewEncapsulation.None,
})
export class CalendariComponent {
  selected: Date | null = new Date();
  @ViewChild(ReservarComponent) child: ReservarComponent;
  guardiesMes: Map<string, Array<string>>;

  constructor(private httpClient: GuardiaApiService) {

  }

  ngOnInit() {
this.getMonthGuardies();
  }
  initialize() {
    this.child.dia = this.selected;
    this.child.initialize();

  }

  getMonthGuardies() {
    this.httpClient.getMonthGuardiesByDateFromTreballador(new Date().toISOString()).subscribe(
      response => {

        let dies = new Map<string, Array<string>>;

        Object.values(response)[0].forEach((guardia: any) => {
          if (dies.has(guardia.dia)) {
            let dia = dies.get(guardia.dia);
            dia?.push(guardia.estat);
          } else {
            let estats = new Array<string>;
            estats.push(guardia.estat);
            dies.set(guardia.dia, estats);
          }
          this.guardiesMes = dies;
        });


      }
    );
  }

  dateClass() {

    return (date: Date): MatCalendarCellCssClasses => {

      //todo guardiesMes és undefined perquè el subscribe no ha finalitzat encara i ja s'està fent aquest.
      this.selected!.setHours(0, 0, 0, 0);
      let dataFormated = formatDate(date, 'yyyy-MM-dd', 'ca-CA');

      let estatsDelDia = this.guardiesMes.get(dataFormated);

      if (estatsDelDia != null && estatsDelDia.includes('PENDENT')) {
        return 'pendent-date';
      } else if (estatsDelDia != null && estatsDelDia.includes('ASSIGNADA')) {
        return 'assignada-date';
      }

      if (date < this.selected!) {
        return 'grey-date';
      }




      return 'special-date';

    };
  }

}

