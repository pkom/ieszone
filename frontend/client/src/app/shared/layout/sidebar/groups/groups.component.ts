import { Component, OnInit } from '@angular/core';
import { Color } from '@iz/enum';
import { ChipPrefix } from 'frontend/shared/src/lib/controls/controls.enum';

@Component({
  selector: 'iz-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  basicChipList = [
    {
      name: '6th Std',
      prefix: ChipPrefix.DEFAULT,
      selected: true,
      color: Color.WARN,
    },
    { name: '6A Section', prefix: ChipPrefix.SELECTED, selected: true },
    { name: 'Chennai', color: Color.GENTLE, prefix: ChipPrefix.DEFAULT },
    { name: 'Class Leader', prefix: ChipPrefix.DEFAULT, selected: true },
    {
      name: 'Chess Club',
      color: Color.WARN,
      prefix: ChipPrefix.SELECTED,
      selected: true,
    },
    {
      name: 'vidyamandir',
      color: Color.PRIMARY,
      selected: true,
      prefix: ChipPrefix.DEFAULT,
    },
    { name: 'higher Class' },
    { name: 'Bus Route 5', prefix: ChipPrefix.SCATTER },
    { name: 'Badminton', selected: true },
    {
      name: 'Artist Academy',
      prefix: ChipPrefix.SCATTER,
      selected: true,
      color: Color.WARN,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
