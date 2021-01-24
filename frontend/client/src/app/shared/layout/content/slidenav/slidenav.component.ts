import { Component, OnInit } from '@angular/core';
import { GeneralService } from '@core/general.service';
// import { Store } from '@ngrx/store';
// import { LogoutUser } from '../../../setting/+state/config.action';
import { Router } from '@angular/router';

@Component({
  selector: 'iz-slidenav',
  templateUrl: './slidenav.component.html',
  styleUrls: ['./slidenav.component.scss'],
})
export class SlidenavComponent implements OnInit {
  darkTheme = false;
  constructor(
    private general: GeneralService,
    // private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.general.darkTheme$.subscribe((value) => (this.darkTheme = value));
  }

  changeTheme() {
    this.darkTheme = !this.darkTheme;
    this.general.setDarkTheme(this.darkTheme);
  }

  toggleSlider(ref: string) {
    this.general.setSliderToggle(ref);
  }

  logout() {
    // this.store.dispatch(LogoutUser());
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
