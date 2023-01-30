import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendariComponent} from './projecte/components/calendari/calendari.component';
import { HistorialComponent} from './projecte/components/historial/historial.component';
import { LoginComponent } from './projecte/components/login/login.component';
import { AdminMainScreenComponent } from './projecte/components/admin-main-screen/admin-main-screen.component';
import { AuthGuard } from './projecte/guards/auth.guard';
import { LogoutComponent } from './projecte/components/logout/logout.component';


  const routes: Routes = [
    { path: 'calendari', component: CalendariComponent, canActivate: [AuthGuard] },
    { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminMainScreenComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'logout', component: LogoutComponent},
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
