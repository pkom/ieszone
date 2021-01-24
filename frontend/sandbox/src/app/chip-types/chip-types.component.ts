import { Component, OnInit } from '@angular/core';
import { Chip } from 'frontend/shared/src/lib/controls/controls.interface';
import {
  MatColor,
  ChipPrefix,
  Color,
} from 'frontend/shared/src/lib/controls/controls.enum';

@Component({
  selector: 'demo-chip-types',
  templateUrl: './chip-types.component.html',
  styleUrls: ['./chip-types.component.scss'],
})
export class ChipTypesComponent implements OnInit {
  basicChip: Chip[];
  basicChipList: Chip[];
  constructor() {}

  ngOnInit(): void {
    this.basicChip = [
      { name: 'Simple' },
      { name: 'Primary Selected', color: Color.PRIMARY, selected: true },
      { name: 'With Prefix Icon', prefix: ChipPrefix.DEFAULT, selected: true },
      {
        name: 'Different Icon',
        prefix: ChipPrefix.SCATTER,
        selected: true,
        color: Color.ACCENT,
      },
      {
        name: 'Warn Removable',
        removable: true,
        selected: true,
        color: Color.WARN,
      },
      {
        name: 'Error',
        removable: true,
        color: Color.ERROR,
        selected: true,
      },
    ];
    this.basicChipList = [
      { name: 'Simple' },
      { name: 'Primary', selected: true },
      { name: 'Simple' },
      { name: 'Primary', prefix: ChipPrefix.SCATTER, selected: true },
      { name: 'Simple' },
      { name: 'Simple' },
      { name: 'Simple' },
      { name: 'Primary', selected: true },
      { name: 'Primary', selected: true },
      { name: 'Simple' },
      { name: 'Some other item', prefix: ChipPrefix.SCATTER },
      { name: 'Another item', selected: true },
      { name: 'Primary', selected: true },
      { name: 'Simple' },
    ];
  }
}
