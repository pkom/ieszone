import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Color } from '../controls.enum';

@Component({
  selector: 'iz-calendar',
  templateUrl: './calendar.control.html',
  styleUrls: ['./calendar.control.scss'],
})
export class CalendarControl implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    fixedWeekCount: false,
    events: [
      {
        title: `Planned Leave - 3 Days`,
        start: '2020-09-09',
        end: '2020-09-12',
        startEditable: true,
        textColor: 'black',
        backgroundColor: Color.WARN,
        borderColor: 'transparent',
        durationEditable: true,
      },
      {
        title: 'Holiday',
        date: '2020-09-24',
        className: 'center',
        textColor: 'green',
        backgroundColor: Color.GENTLE,
        borderColor: 'transparent',
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
