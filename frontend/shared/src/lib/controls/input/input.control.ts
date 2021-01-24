import { Component, OnInit, Input } from '@angular/core';
import { ControlAbstract } from '../common.control';

@Component({
  selector: 'iz-input',
  templateUrl: './input.control.html',
  styleUrls: ['./input.control.scss'],
})
export class InputControl extends ControlAbstract implements OnInit {
  @Input() telCode: string;

  hide = false;

  ngOnInit(): void {
    super.ngOnInit();
    this.hide = this.type === 'password';
  }
}
