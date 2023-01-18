import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiaComponent } from './projecte/components/dia/dia.component';
import { MesComponent } from './projecte/components/mes/mes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendariComponent } from './projecte/components/calendari/calendari.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HistorialComponent } from './projecte/components/historial/historial.component';


@NgModule({
  declarations: [
    AppComponent,
    DiaComponent,
    MesComponent,
    CalendariComponent,
    HistorialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
