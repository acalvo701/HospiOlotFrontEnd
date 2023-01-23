import { Component, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ReservarComponent } from '../reservar/reservar.component';

@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.css']
})
export class CalendariComponent {
  selected: Date = new Date();
  @ViewChild(ReservarComponent) child:ReservarComponent;

  initialize(){
    this.child.dia = this.selected;
    this.child.initialize();
  }
}
