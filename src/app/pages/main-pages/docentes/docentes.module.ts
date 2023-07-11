import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesComponent } from './docentes.component';
import { DocentesRoutingModule } from './docentes-routing.module';
import { IonicModule } from '@ionic/angular'


@NgModule({
  declarations: [DocentesComponent],
  imports: [
    CommonModule,
    DocentesRoutingModule,
    IonicModule
  ]
})
export class DocentesModule { }
