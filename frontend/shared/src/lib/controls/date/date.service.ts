// date-time.service
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateTimeService {
  private _format = 'DD/MM/YYYY';
  private _locale = 'en-US';

  set format(value: string) {
    this._format = value;
  }

  get format(): string {
    return this._format;
  }

  get locale(): string {
    return this._locale;
  }
}
