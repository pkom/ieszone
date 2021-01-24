import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChipPrefix } from '../controls.enum';
import { Chip } from '../controls.interface';

@Component({
  selector: 'iz-chip',
  templateUrl: './chip.control.html',
  styleUrls: ['./chip.control.scss'],
})
export class ChipControl {
  color: string;
  removable: boolean;
  selectable: boolean;
  selected: boolean;
  selectedBg = { border: '1.5px solid #dddddd' };

  @Input() prefix: ChipPrefix;
  @Input() name: string | number;

  @Input('removable')
  set Removable(value: boolean) {
    this.removable = value || false;
  }
  @Input('selectable')
  set Selectable(value: boolean) {
    this.selectable = value || false;
  }
  @Input('color')
  set Color(color: string) {
    this.color = color || '#616161';
    this.setSelect();
  }
  @Input('selected')
  set Selected(value: boolean) {
    this.selected = value || false;
    this.setSelect();
  }

  @Output() chipRemoved: EventEmitter<string> = new EventEmitter();

  remove(): void {
    this.chipRemoved.emit(name);
  }

  setSelect() {
    if (this.selected && this.color)
      this.selectedBg = { border: `1.5px solid ${this.color}` };
  }
}

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'iz-chiplist',
  templateUrl: './chip-list.control.html',
  styleUrls: ['./chip.control.scss'],
})
export class ChipListControl {
  @Input() list: Chip[] = [];
  @Input() editable = false;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.list.push({ name: value.trim(), removable: true });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(chip: Chip): void {
    const index = this.list.indexOf(chip);

    if (index >= 0) {
      this.list.splice(index, 1);
    }
  }
}
