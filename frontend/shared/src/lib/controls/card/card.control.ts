import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Button } from '../controls.interface';

@Component({
  selector: 'iz-card',
  templateUrl: './card.control.html',
  styleUrls: ['./card.control.scss'],
})
export class CardControl implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() content: TemplateRef<any>;
  @Input() buttons: Button[];
  /**
   * @param {string} img - Path ref - 'assets/images/logo.png'
   */
  @Input() img: string;
  @Input() tag: string;

  constructor() {}

  ngOnInit(): void {}
}
