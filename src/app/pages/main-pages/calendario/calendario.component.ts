import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit{

  public events: any[] = [];

  public options: any;

  constructor(){

  }

  ngOnInit(){

    this.options = {
      plugins: [dayGridPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      header:{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth, timeGridweek, timeGridDay'
      },
      editable: false
    }

    this.events = [
      {
        title: "Evento 1",
        start: new Date(),
        description: "Evento 1"
      },
      {
        title: "Evento 2",
        start: new Date(new Date().getTime() + 89391),
        description: "Evento 2"
      },
      {
        title: "Evento 2",
        start: new Date(),
        end: new Date(new Date().getTime() + 80000 ),
        description: "Evento 2"
      }
    ]
  }

}
