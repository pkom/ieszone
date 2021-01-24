import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { DateTimeService } from './date.service';

@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {
  constructor(private _dateTimeService: DateTimeService) {
    super('en-US'); // set default locale
  }

  public format(date: moment.Moment, displayFormat: string): string {
    const { locale, format } = this._dateTimeService;

    return date.locale(locale).format(format);
  }
}
