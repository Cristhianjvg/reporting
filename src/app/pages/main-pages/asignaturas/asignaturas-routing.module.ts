import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsiganturasComponent } from './asignaturas.component';

const routes: Routes = [
  {path: '',
component: AsiganturasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignaturasRoutingModule { 

  
  
}
