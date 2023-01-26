import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesComponent} from './projecte/components/mes/mes.component';
import { HistorialComponent} from './projecte/components/historial/historial.component';
import { LoginComponent } from './projecte/components/login/login.component';
import { AdminMainScreenComponent } from './projecte/components/admin-main-screen/admin-main-screen.component';
import { AuthGuard } from './projecte/guards/auth.guard';


  const routes: Routes = [
    { path: 'mes', component: MesComponent, canActivate: [AuthGuard] },
    { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminMainScreenComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
