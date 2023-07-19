import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AsignacionesComponent } from './asignaciones.component';
import { asignacionesRoutingModule } from './asignaciones-routing.module';


@NgModule({
  declarations: [AsignacionesComponent],
  imports: [
    CommonModule,
    asignacionesRoutingModule,
    ReactiveFormsModule
  ]
})
export class AsignacionesModule { }
