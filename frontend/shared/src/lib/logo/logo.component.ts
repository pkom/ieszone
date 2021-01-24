import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iz-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() poweredBy = true;
  @Input() size: 'large' | 'small';

  constructor() {}

  ngOnInit(): void {}
}
