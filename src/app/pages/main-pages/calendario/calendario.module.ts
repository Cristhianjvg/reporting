import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario.component';
import { CalendarioRoutingModule } from './calendario-routing.module';

import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    FullCalendarModule
  ]
})
export class CalendarioModule { }
