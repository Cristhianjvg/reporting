import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrerasComponent } from './carreras.component';

const routes: Routes = [
  {path: '',
component: CarrerasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocentesRoutingModule { 

  
  
}
