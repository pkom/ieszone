import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'iz-loader',
  templateUrl: './loader.control.html',
  styleUrls: ['./loader.control.scss'],
})
export class LoaderControl {
  @Input() color: ThemePalette = 'primary';
  @Input() mode: ProgressBarMode = 'determinate';
  @Input() value: number;
  @Input() bufferValue: number;
}
