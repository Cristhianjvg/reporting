import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 4);

const TOMORROW_STR = tomorrow.toISOString().replace(/T.*$/, '');
console.log(TOMORROW_STR);

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    title: 'Evento de varios días',
    start: TODAY_STR , // Fecha y hora de inicio en el primer día
    end: TOMORROW_STR  // Fecha y hora de finalización en el segundo día
  }
];

export function createEventId() {
  return String(eventGuid++);
}