import { Injectable } from '@angular/core';
import { environment } from '@env';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { HttpService } from '@core/http.service';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AppConfig, Config, Course } from '@iz/interface';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  static END_POINT_CONFIG = environment.REST_CORE + '/configuration';
  static END_POINT_COURSES = environment.REST_CORE + '/courses';
  static END_POINT_STATUS = environment.REST_CORE;

  appStatus$ = this.httpService.get(GeneralService.END_POINT_STATUS);

  appConfig$: Observable<AppConfig> = this.httpService
    .get(GeneralService.END_POINT_CONFIG)
    .pipe(shareReplay());

  appCourses$: Observable<Course[]> = this.httpService
    .get(GeneralService.END_POINT_COURSES)
    .pipe(shareReplay());

  darkTheme$ = new BehaviorSubject<boolean>(false);
  slider$ = new BehaviorSubject<boolean | string>(false);

  private courseSelectedAction = new BehaviorSubject<string>(null);

  selectedCourse$ = combineLatest([
    this.courseSelectedAction,
    this.appCourses$,
  ]).pipe(
    map(([selectedCourseId, courses]) =>
      courses.find((course) => course.id === selectedCourseId),
    ),
    tap((course) => console.info('selectedCourse', course)),
    shareReplay(1),
    // catchError(this.handleError),
  );

  constructor(private httpService: HttpService) {}

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme$.next(isDarkTheme);
  }

  setSliderToggle(sliderTarget: boolean | string): void {
    this.slider$.next(sliderTarget);
  }

  changeSelectedCourse(selectedCourseId: string | null): void {
    this.courseSelectedAction.next(selectedCourseId);
  }
}
