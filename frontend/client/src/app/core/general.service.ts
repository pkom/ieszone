import { Injectable } from '@angular/core';
import { environment } from '@env';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '@core/http.service';
import { Config, Course } from './config.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  static END_POINT_CONFIG = environment.REST_CORE + '/configuration';
  static END_POINT_COURSES = environment.REST_CORE + '/courses';
  static END_POINT_STATUS = environment.REST_CORE;

  appStatus$ = this.httpService.get(GeneralService.END_POINT_STATUS);
  darkTheme$ = new BehaviorSubject<boolean>(false);
  slider$ = new BehaviorSubject<boolean | string>(false);

  config$: Observable<Config> = this.httpService.get(
    GeneralService.END_POINT_CONFIG,
  );
  courses$: Observable<Course[]> = this.httpService.get(
    GeneralService.END_POINT_COURSES,
  );

  constructor(private httpService: HttpService) {}

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme$.next(isDarkTheme);
  }

  setSliderToggle(sliderTarget: boolean | string): void {
    this.slider$.next(sliderTarget);
  }
}
