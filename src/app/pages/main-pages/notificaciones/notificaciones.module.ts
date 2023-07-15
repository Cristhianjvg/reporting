import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones.component';
import { NotificacionesRoutingModule } from './notificaciones-routing.module';
import { IonicModule } from '@ionic/angular'


@NgModule({
  declarations: [NotificacionesComponent],
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
    IonicModule
  ]
})
export class NotificacionesModule { }
