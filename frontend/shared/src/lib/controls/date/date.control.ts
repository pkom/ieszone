import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlAbstract } from '../common.control';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from './date.adapter';
import { DateTimeService } from './date.service';

import moment from 'moment';

@Component({
  selector: 'iz-date',
  templateUrl: './date.control.html',
  styleUrls: ['./date.control.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    CustomDateAdapter,
    DateTimeService,
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [DateTimeService],
    },
  ],
})
export class DateControl extends ControlAbstract implements OnInit {
  @Input() inputDisabled: boolean = false;
  @Input() touch = false;
  @Input() format = 'DD/MM/YYYY';

  constructor(private dateTimeService: DateTimeService) {
    super();
  }

  ngOnInit(): void {
    this.dateTimeService.format = this.format;
    this.control =
      this.control ||
      new FormControl(
        { value: moment(this.initialValue), disabled: this.disabled },
        this.validators,
        this.asyncValidators,
      );
  }
}

@Component({
  selector: 'iz-date-range',
  templateUrl: './date-range.control.html',
  styleUrls: ['./date.control.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    CustomDateAdapter,
    DateTimeService,
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [DateTimeService],
    },
  ],
})
export class DateRangeControl extends ControlAbstract implements OnInit {
  @Input() inputDisabled: boolean = false;
  @Input() touch = false;
  @Input() format = 'DD/MM/YYYY';
  @Input() formGroup;
  @Input() start;
  @Input() end;
  @Input() compareStart;
  @Input() compareEnd;

  constructor(private dateTimeService: DateTimeService) {
    super();
  }

  ngOnInit(): void {
    this.dateTimeService.format = this.format;
    this.formGroup =
      this.formGroup ||
      new FormGroup(
        {
          start: new FormControl(moment(this.start)),
          end: new FormControl(moment(this.end)),
        },
        this.validators,
        this.asyncValidators,
      );
  }
}
