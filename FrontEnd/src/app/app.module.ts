import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendariComponent } from './projecte/components/calendari/calendari.component';
import { MesComponent } from './projecte/components/mes/mes.component';
import { DiaComponent } from './projecte/components/dia/dia.component';
import { HistorialComponent } from './projecte/components/historial/historial.component';


@NgModule({
  declarations: [AppComponent, MesComponent, CalendariComponent, DiaComponent, HistorialComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
