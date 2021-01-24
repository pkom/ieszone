import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'demo-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss'],
})
export class MiscComponent implements OnInit {
  darkTheme = false;
  constructor(private theme: ThemeService) {}

  ngOnInit(): void {}

  changeTheme() {
    this.darkTheme = !this.darkTheme;
    this.theme.setDarkTheme(this.darkTheme);
  }
}
