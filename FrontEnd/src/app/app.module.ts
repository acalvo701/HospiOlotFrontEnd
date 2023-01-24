import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendariComponent } from './projecte/components/calendari/calendari.component';
import { MesComponent } from './projecte/components/mes/mes.component';
import { HistorialComponent } from './projecte/components/historial/historial.component';
import { ReservarComponent } from './projecte/components/reservar/reservar.component';
import { NavbarComponent } from './projecte/components/navbar/navbar.component';
import { AdminAssignarGuardiaComponent } from './projecte/components/admin-assignar-guardia/admin-assignar-guardia.component';
import { LoginComponent } from './projecte/components/login/login.component';


@NgModule({
  declarations: [AppComponent, MesComponent, CalendariComponent, HistorialComponent, ReservarComponent, NavbarComponent, AdminAssignarGuardiaComponent, LoginComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
