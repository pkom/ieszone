import { Component, Input } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'iz-spinner',
  templateUrl: './spinner.control.html',
  styleUrls: ['./spinner.control.scss'],
})
export class SpinnerControl {
  @Input() color: ThemePalette = 'primary';
  @Input() mode: ProgressSpinnerMode = 'determinate';
  @Input() value: number;
}
