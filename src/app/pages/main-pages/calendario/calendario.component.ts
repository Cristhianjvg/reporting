import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { INITIAL_EVENTS, createEventId } from './event-utils';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit{

  public events: EventApi[] = [];

  public options: any;

  constructor(private changeDetector: ChangeDetectorRef){

  }

  ngOnInit(){

    this.options = {
      plugins: [dayGridPlugin],
      defaultDate: new Date(),
      header:{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth, timeGridweek, timeGridDay'
      },
      editable: false
    }

    // this.events = [
    //   {
    //     title: "Evento 1",
    //     start: new Date(),
    //     description: "Evento 1"
    //   },
    //   {
    //     title: "Evento 2",
    //     start: new Date(new Date().getTime() + 89391),
    //     description: "Evento 2"
    //   },
    //   {
    //     title: "Evento 2",
    //     start: new Date(),
    //     end: new Date(new Date().getTime() + 80000 ),
    //     description: "Evento 2"
    //   }
    // ]
  }


  handleWeekendsToggle() {
    const { options } = this;
    options.weekends = !options.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.events = events;
    this.changeDetector.detectChanges();
  }

}
