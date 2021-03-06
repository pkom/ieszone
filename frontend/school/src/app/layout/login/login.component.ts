import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginUser } from '../../setting/+state/config.action';
import { map } from 'rxjs/operators';
import * as fromConfig from '../../setting/+state/config.selector';

@Component({
  selector: 'z-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  config$ = this.store.select(fromConfig.getConfig);
  courses$ = this.store.select(fromConfig.getCourses).pipe(
    map((courses) =>
      courses.map((course) => ({
        value: course.id,
        displayValue: course.course,
      })),
    ),
  );
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      course: [''],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(LoginUser(this.loginForm.value));
    }
  }
}
