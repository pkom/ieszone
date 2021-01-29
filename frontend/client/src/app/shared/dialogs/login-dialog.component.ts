import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from '@core/general.service';
import { Course } from '@core/config.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  username: string;
  password: string;
  courseid: string;
  courses: Course[];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private generalService: GeneralService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.generalService.config$.subscribe(
        (config) => (this.courseid = config.defaultCourse.id),
      ),
    );
    this.subscriptions.add(
      this.generalService.courses$.subscribe(
        (courses) => (this.courses = courses),
      ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
