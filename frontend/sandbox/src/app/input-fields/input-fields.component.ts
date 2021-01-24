import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'demo-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss'],
})
export class InputFieldsComponent implements OnInit {
  required = [Validators.required];
  sampleControl = new FormControl(
    { value: 'password', disabled: false },
    this.required,
  );
  radioControl = new FormControl(
    { value: 'male', disabled: false },
    this.required,
  );
  options = ['male', 'female', 'other'];
  selectOptions = [
    { value: 'low', displayValue: 'Low' },
    { value: 'medium', displayValue: 'Medium' },
    { value: 'high', displayValue: 'High' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
