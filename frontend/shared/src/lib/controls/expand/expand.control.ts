import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ExpandItem } from '../controls.interface';

@Component({
  selector: 'iz-expand',
  templateUrl: './expand.control.html',
  styleUrls: ['./expand.control.scss'],
})
export class ExpandControl implements OnInit {
  @Input() items: ExpandItem[];
  @Input() multi = true;
  @Input() template: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
