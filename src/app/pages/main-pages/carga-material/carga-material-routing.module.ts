import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaMaterialComponent } from './carga-material.component';

const routes: Routes = [
  {path: '',
component: CargaMaterialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaMaterialRoutingModule { 


  
  
  
}
