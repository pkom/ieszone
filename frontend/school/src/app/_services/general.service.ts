import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpService } from '@core/http.service';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Course } from '../../../../../backend/interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  static END_POINT_CONFIG = environment.REST_CORE + '/configuration';
  static END_POINT_COURSES = environment.REST_CORE + '/courses';
  static END_POINT_STATUS = environment.REST_CORE;

  appStatus$ = this.http.get(GeneralService.END_POINT_STATUS);
  darkTheme$ = new BehaviorSubject<boolean>(false);
  slider$ = new BehaviorSubject<boolean | string>(false);
  courseSelected$ = new BehaviorSubject<string>(null);
  config$ = this.http.get(GeneralService.END_POINT_CONFIG).pipe(shareReplay());
  courses$: Observable<Course[]> = this.http
    .get(GeneralService.END_POINT_COURSES)
    .pipe(shareReplay());

  selectedCourse$ = combineLatest([this.courseSelected$, this.courses$]).pipe(
    map(([selectedCourseId, courses]) =>
      courses.find((course) => course.id === selectedCourseId),
    ),
    tap((course) => console.info('selectedCourse', course)),
    shareReplay(1),
    // catchError(this.handleError),
  );

  constructor(private http: HttpService) {}

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme$.next(isDarkTheme);
  }

  setSliderToggle(sliderTarget: boolean | string): void {
    this.slider$.next(sliderTarget);
  }

  changeSelectedCourse(selectedCourseId: string | null): void {
    this.courseSelected$.next(selectedCourseId);
  }
}
