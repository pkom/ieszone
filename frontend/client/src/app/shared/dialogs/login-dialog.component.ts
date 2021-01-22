import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class LoginDialogComponent {
  username: string;
  password: string;
  courseid: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

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
