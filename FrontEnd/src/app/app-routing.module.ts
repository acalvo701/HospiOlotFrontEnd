import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesComponent} from './projecte/components/mes/mes.component';
import { HistorialComponent} from './projecte/components/historial/historial.component';
import { AdminAssignarGuardiaComponent } from './projecte/components/admin-assignar-guardia/admin-assignar-guardia.component';
import { LoginComponent } from './projecte/components/login/login.component';


  const routes: Routes = [
    { path: 'mes', component: MesComponent },
    { path: 'historial', component: HistorialComponent },
    { path: 'admin', component: AdminAssignarGuardiaComponent },
    { path: 'login', component: LoginComponent },
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
