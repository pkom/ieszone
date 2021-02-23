import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadConfig } from './setting/+state/config.action';
import { Observable } from 'rxjs';
import { AppConfig, AppStatus, Course } from '@iz/interface';
import {
  SelectConfiguration,
  SelectCourses,
  SelectStatus,
} from './setting/+state/config.selector';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'iz-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  appStatus$: Observable<AppStatus> = this.store.select(SelectStatus);
  appConfig$: Observable<AppConfig> = this.store.select(SelectConfiguration);
  appCourses$: Observable<Course[]> = this.store.select(SelectCourses);

  constructor(private store: Store) {
    this.appStatus$.pipe(filter((val) => !!val)).subscribe((status) => {
      console.info(status?.message);
    });
    this.appConfig$.subscribe((config) => {
      console.info(config);
    });
    this.appCourses$.subscribe((courses) => {
      console.info(courses);
    });
  }

  ngOnInit() {
    this.store.dispatch(LoadConfig());
  }
}
