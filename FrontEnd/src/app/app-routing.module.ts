import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesComponent} from './projecte/components/mes/mes.component';
import { HistorialComponent} from './projecte/components/historial/historial.component';
<<<<<<< HEAD
import { AdminAssignarGuardiaComponent } from './projecte/components/admin-assignar-guardia/admin-assignar-guardia.component';
import { LoginComponent } from './projecte/components/login/login.component';
=======
import { AdminMainScreenComponent } from './projecte/components/admin-main-screen/admin-main-screen.component';
>>>>>>> fbf0d03d0ee6eff7dd82b667377aab4199382e6c


  const routes: Routes = [
    { path: 'mes', component: MesComponent },
    { path: 'historial', component: HistorialComponent },
<<<<<<< HEAD
    { path: 'admin', component: AdminAssignarGuardiaComponent },
    {path: 'login', component: LoginComponent},
=======
    { path: 'admin', component: AdminMainScreenComponent },
>>>>>>> fbf0d03d0ee6eff7dd82b667377aab4199382e6c
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
