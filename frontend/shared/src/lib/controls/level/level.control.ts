import { Component, Input } from '@angular/core';
import { ControlAbstract } from '../common.control';

@Component({
  selector: 'iz-level',
  templateUrl: './level.control.html',
  styleUrls: ['./level.control.scss'],
})
export class LevelControl extends ControlAbstract {
  @Input() invert = false;
  @Input() max = 100;
  @Input() min = 0;
  @Input() showTicks = false;
  @Input() step = 1;
  @Input() thumbLabel = false;
  @Input() vertical = false;
}
