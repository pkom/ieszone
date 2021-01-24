import { Component, OnInit, Input } from '@angular/core';
import { TabInput } from '../controls.interface';

@Component({
  selector: 'iz-tab',
  templateUrl: './tab.control.html',
  styleUrls: ['./tab.control.scss'],
})
export class TabControl implements OnInit {
  tabs: TabInput[];
  firstItem: TabInput;
  onLoad = true;
  @Input('tabs')
  set Tabs([first, ...rest]: TabInput[]) {
    this.tabs = rest;
    this.firstItem = first;
    this.onLoad = true;
  }

  constructor() {}

  ngOnInit(): void {}

  moderate() {
    this.onLoad = false;
  }
}
