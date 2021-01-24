import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlAbstract } from '../common.control';
import { ButtonType } from '../controls.enum';
import { BtnToggle } from '../controls.interface';

@Component({
  selector: 'iz-button',
  templateUrl: './button.control.html',
  styleUrls: ['./button.control.scss'],
})
export class ButtonControl extends ControlAbstract implements OnInit {
  readonly button = {
    basic: 'mat-button',
    raised: 'mat-raised-button',
    stroked: 'mat-stroked-button',
    flat: 'mat-flat-button',
    icon: 'mat-icon-button',
    fab: 'mat-fab',
    mini: 'mat-mini-fab',
  };

  @Input() icon: string;
  @Input() position: 'prefix' | 'suffix' = 'prefix';
  @Input() type: ButtonType = 'raised';

  ngOnInit(): void {}
}

@Component({
  selector: 'iz-button-toggle',
  templateUrl: './button-toggle.control.html',
  styleUrls: ['./button.control.scss'],
})
export class ButtonToggleControl {
  @Input() initialValue: string | number;
  @Input() position: 'prefix' | 'suffix' = 'prefix';
  @Input() type: ButtonType = 'raised';
  @Input() buttons: BtnToggle[];
  @Output() toggleValue: EventEmitter<string> = new EventEmitter();

  onValChange(val: string) {
    this.toggleValue.emit(val);
  }
}
