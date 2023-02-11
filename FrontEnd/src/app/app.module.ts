import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeCa from '@angular/common/locales/ca';
registerLocaleData(localeCa);
import { AppComponent } from './app.component';
import { CalendariComponent } from './projecte/components/calendari/calendari.component';
import { HistorialComponent } from './projecte/components/historial/historial.component';
import { ReservarComponent } from './projecte/components/reservar/reservar.component';
import { AdminAssignarGuardiaComponent } from './projecte/components/admin-assignar-guardia/admin-assignar-guardia.component';
import { AdminCrearGuardiaComponent } from './projecte/components/admin-crear-guardia/admin-crear-guardia.component';
import { AdminEstatGuardiaComponent } from './projecte/components/admin-estat-guardia/admin-estat-guardia.component';
import { AdminMainScreenComponent } from './projecte/components/admin-main-screen/admin-main-screen.component';
import { LoginComponent } from './projecte/components/login/login.component';
import { AdminModificarEsquemaComponent } from './projecte/components/admin-modificar-esquema/admin-modificar-esquema.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtInterceptor } from './projecte/interceptors/jwt.interceptor';
import { AdminGenerarGuardiesEsquemaComponent } from './projecte/components/admin-generar-guardies-esquema/admin-generar-guardies-esquema.component';
import { HeaderComponent } from './projecte/components/header/header.component';
import { LogoutComponent } from './projecte/components/logout/logout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminAssignarMultipleGuardiaComponent } from './projecte/components/admin-assignar-multiple-guardia/admin-assignar-multiple-guardia.component';
import { AdminGenerarFestiusComponent } from './projecte/components/admin-generar-festius/admin-generar-festius.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FooterComponent } from './projecte/components/footer/footer.component'


@NgModule({
  declarations: [AppComponent, CalendariComponent, HistorialComponent, ReservarComponent, AdminAssignarGuardiaComponent, AdminCrearGuardiaComponent, AdminEstatGuardiaComponent, AdminMainScreenComponent, LoginComponent, AdminModificarEsquemaComponent, AdminGenerarGuardiesEsquemaComponent, HeaderComponent, LogoutComponent, AdminAssignarMultipleGuardiaComponent, AdminGenerarFestiusComponent, FooterComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    NgxCsvParserModule,
    
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ca-CA'},
    JwtHelperService, {
    provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
    }
  
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
