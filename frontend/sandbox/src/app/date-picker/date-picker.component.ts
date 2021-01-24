import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  // See the Moment.js docs for the available formats:
  // https://momentjs.com/docs/#/displaying/format/
  today = new Date();
  constructor() {}

  ngOnInit(): void {}
}
