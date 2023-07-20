import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaMaterialComponent } from './carga-material.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CargaMaterialRoutingModule } from './carga-material-routing.module';


@NgModule({
  declarations: [CargaMaterialComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CargaMaterialRoutingModule
  ]
})
export class CargaMaterialModule { }
