import { Component, Input } from '@angular/core';
import { ControlAbstract } from '../common.control';

@Component({
  selector: 'iz-select',
  templateUrl: './select.control.html',
  styleUrls: ['./select.control.scss'],
})
export class SelectControl extends ControlAbstract {
  @Input() options: Array<any>;
}
