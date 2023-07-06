import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesComponent } from './docentes.component';
import { DocentesRoutingModule } from './docentes-routing.module';


@NgModule({
  declarations: [DocentesComponent],
  imports: [
    CommonModule,
    DocentesRoutingModule
  ]
})
export class DocentesModule { }
