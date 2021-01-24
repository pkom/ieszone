import { Component, OnInit } from '@angular/core';
import { BtnToggle } from 'frontend/shared/src/lib/controls/controls.interface';

@Component({
  selector: 'demo-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  buttons: BtnToggle[] = [
    { name: 'left', value: 'left' },
    { name: 'center', value: 'center' },
    { name: 'right', value: 'right' },
    { name: 'justify', value: 'justify', disabled: true },
  ];

  iconButtons: BtnToggle[] = [
    { icon: 'format_align_left', value: 'left' },
    { icon: 'format_align_center', value: 'center' },
    { icon: 'format_align_right', value: 'right' },
    { icon: 'format_align_justify', value: 'justify', disabled: true },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleChange(val) {
    // toggle value change
  }
}
