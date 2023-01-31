import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ReservarComponent } from '../reservar/reservar.component';
import { Inject } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, } from '@angular/material-moment-adapter';
import { DateAdapter, NativeDateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaApiService } from '../../model/services/guardia/guardia-api.service';
import { formatDate } from '@angular/common';

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

class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    
      return formatDate(date, 'yyyy-MM-dd', 'ca-CA');;
    
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
export class CalendariComponent implements OnInit{
  selected: Date | null = new Date();
  @ViewChild(ReservarComponent) child: ReservarComponent;
  guardiesMes: Map<string, Array<string>>;

  constructor(private httpClient: GuardiaApiService) {
    this.getAllGuardies();
  }

  initialize() {
    this.child.dia = this.selected;
    this.child.initialize();
  }

  ngOnInit(){
    this.getAllGuardies();
  }
  ngAfterViewInit() {
    const monthPrevBtn = document.querySelectorAll(
      '.mat-calendar-previous-button'
    );
    const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');
    let elements = Array.from(monthPrevBtn).concat(Array.from(monthNextBtn));
    elements.forEach((button) => {
        document.addEventListener('click', (event) => {
          this.pintar();
        });
      });
    }
  
  getAllGuardies() {
    this.httpClient.getAllGuardiesFromTreballador().subscribe(
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
          this.pintar();
        });
      }
    );
  }

  pintar() {
    Array.from(document.getElementsByClassName('mat-calendar-body-cell')).forEach(cela => {
      let dataLabel = cela.getAttribute("aria-label");
      if (dataLabel) {
        let data = new Date(dataLabel);

        this.selected!.setHours(0, 0, 0, 0);
        let dataFormated = formatDate(data, 'yyyy-MM-dd', 'ca-CA');
  
        let estatsDelDia = this.guardiesMes.get(dataFormated);
  
        if (estatsDelDia != null && estatsDelDia.includes('PENDENT')) {
          cela.classList.add('pendent-date');
        } else if (estatsDelDia != null && estatsDelDia.includes('ASSIGNADA')) {
          cela.classList.add('assignada-date');
        }
      }
    })


  }


}

