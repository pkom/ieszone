import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { GeneralService } from '@core/general.service';

@Component({
  selector: 'iz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  center: string;
  code: string;
  defaultCourseId: string;
  courses = [];

  constructor(
    private auth: AuthService,
    private generalService: GeneralService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      password: [''],
      courseId: [''],
    });
    this.generalService.config$.subscribe((config) => {
      this.center = config.center;
      this.code = config.code;
      this.defaultCourseId = config.defaultCourse.id;
      this.loginForm.controls['courseId'].setValue(this.defaultCourseId);
    });
    this.generalService.courses$.subscribe((courses) => {
      this.courses = courses.map((course) => ({
        value: course.id,
        displayValue: course.denomination,
      }));
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.auth
        .login(
          this.loginForm.value['userName'],
          this.loginForm.value['password'],
          this.loginForm.value['courseId'],
        )
        .subscribe(() => {
          if (this.auth.isAdmin()) {
            this.router.navigate(['shop']).then();
          }
        });
    }
  }
}
