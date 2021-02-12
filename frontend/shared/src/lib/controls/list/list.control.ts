import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { ListItem } from '../controls.interface';

@Component({
  selector: 'iz-list',
  templateUrl: './list.control.html',
  styleUrls: ['./list.control.scss'],
})
export class ListControl implements OnInit {
  @Input() name: string;
  @Input() items: Array<ListItem>;
  @Input() template: TemplateRef<any>;
  @Output() heroAction: EventEmitter<string> = new EventEmitter();
  @Output() primaryAction: EventEmitter<string> = new EventEmitter();
  @Output() secondaryAction: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}

@Component({
  selector: 'iz-list-select',
  templateUrl: './list-select.control.html',
  styleUrls: ['./list.control.scss'],
})
export class ListSelectionControl implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
