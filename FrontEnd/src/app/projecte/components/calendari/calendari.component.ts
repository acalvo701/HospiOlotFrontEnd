import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.css']
})
export class CalendariComponent {
  selected!: Date | null;
}
