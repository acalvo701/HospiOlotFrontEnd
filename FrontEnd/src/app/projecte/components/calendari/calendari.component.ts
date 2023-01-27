import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ReservarComponent } from '../reservar/reservar.component';

@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendariComponent {
  selected: Date |null = new Date();
  @ViewChild(ReservarComponent) child:ReservarComponent;

  initialize(){
    this.child.dia = this.selected;
    this.child.initialize();
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
