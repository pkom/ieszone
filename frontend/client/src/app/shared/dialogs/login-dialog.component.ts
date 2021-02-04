import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from '@core/general.service';
import { Course } from '@core/config.model';
import { Subscription, Observable, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  username: string;
  password: string;
  courseid: string;

  error$ = new Subject<string>();

  courses$: Observable<Course[]> = this.generalService.courses$.pipe(
    catchError((error) => {
      this.error$.next(error);
      return of(null);
    }),
  );

  defaultCourseId$: Observable<any> = this.generalService.config$.pipe(
    map((config) => config.defaultCourse.id),
    catchError((error) => {
      this.error$.next(error);
      return of(null);
    }),
  );

  constructor(
    private generalService: GeneralService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.generalService.config$
      .pipe(
        map((config) => config.defaultCourse.id),
        catchError((error) => {
          this.error$.next(error);
          return of(null);
        }),
      )
      .subscribe((defaultCourseId) => (this.courseid = defaultCourseId));
  }

  login(): void {
    this.auth
      .login(this.username, this.password, this.courseid)
      .subscribe(() => {
        if (this.auth.isAdmin()) {
          this.router
            .navigate(['shop'])
            .then()
            .finally(() => this.dialog.closeAll());
        } else {
          this.dialog.closeAll();
        }
      });
  }
}
