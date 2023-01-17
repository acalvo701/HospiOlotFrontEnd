import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.css']
})
export class CalendariComponent implements OnInit {
  selected!: Date | null;
  constructor() { }

  ngOnInit(): void {
  }

}
