import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'demo-root',
  template: `
    <demo-layout
      [ngClass]="{ 'dark-theme': isDarkTheme | async }"
    ></demo-layout>
  `,
  styles: [],
})
export class AppComponent {
  title = 'sandbox';
  isDarkTheme = this.theme.darkTheme$;

  constructor(private theme: ThemeService) {}
}
