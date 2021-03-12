import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GeneralService } from '@core/general.service';
import { LoginUser } from '../../setting/+state/config.action';
import { map, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'z-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  center$ = this.general.appConfig$.pipe(pluck('center'));
  defaultCourseId$ = this.general.appConfig$.pipe(pluck('defaultCourse', 'id'));
  courses$ = this.general.appCourses$.pipe(
    map((courses) =>
      courses.map((course) => ({
        value: course.id,
        displayValue: course.course,
      })),
    ),
  );
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private general: GeneralService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      password: [''],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(LoginUser(this.loginForm.value));
    }
  }
}
