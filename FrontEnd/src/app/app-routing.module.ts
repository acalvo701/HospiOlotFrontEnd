import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesComponent} from './projecte/components/mes/mes.component';
import { HistorialComponent} from './projecte/components/historial/historial.component';


  const routes: Routes = [
    { path: 'mes', component: MesComponent },
    { path: 'historial', component: HistorialComponent }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
