import { Component, Input } from '@angular/core';
import { ControlAbstract } from '../common.control';

@Component({
  selector: 'iz-checkbox',
  templateUrl: './checkbox.control.html',
  styleUrls: ['./checkbox.control.scss'],
})
export class CheckboxControl extends ControlAbstract {
  @Input() indeterminate = false;
  @Input() labelPosition: 'before' | 'after' = 'after';
}
