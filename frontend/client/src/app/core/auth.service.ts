import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '@env';
import { User } from '@core/user.model';
import { HttpService } from '@core/http.service';
import { Role } from '@core/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static END_POINT = environment.REST_USER + '/auth/login';
  private user: User;

  constructor(private httpService: HttpService, private router: Router) {}

  login(
    username: string,
    password: string,
    courseid: string,
  ): Observable<User> {
    return (
      this.httpService
        // .authBasic(username, password)
        .post(AuthService.END_POINT, {
          username,
          password,
          courseid,
        })
        .pipe(
          map((jsonToken) => {
            const jwtHelper = new JwtHelperService();
            //this.user = jsonToken; // {token:jwt} => user.token = jwt
            //console.info(jsonToken);
            this.user = {
              id: jwtHelper.decodeToken(jsonToken.payload.token).sub,
              userName: jsonToken.user.userName,
              avatar: jsonToken.user.avatar || '',
              email: jsonToken.user.email || '',
              employeeNumber: jsonToken.user.employeeNumber || '',
              firstName: jsonToken.user.firstName || '',
              lastName: jsonToken.user.lastName || '',
              roles: jsonToken.roles,
              token: jsonToken.payload.token,
              refresh_token: jsonToken.payload.refresh_token,
              courseId: jsonToken.courseId,
              //this.user.name = jwtHelper.decodeToken(jsonToken.token).name;
              //this.user.role = jwtHelper.decodeToken(jsonToken.token).role;
            };
            return this.user;
          }),
        )
    );
  }

  logout(): void {
    this.user = undefined;
    this.router.navigate(['']).then();
  }

  isAuthenticated(): boolean {
    return (
      this.user != null &&
      !new JwtHelperService().isTokenExpired(this.user.token)
    );
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.user.role);
  }

  isAdmin(): boolean {
    return this.hasRoles([Role.ADMIN, Role.ADMINISTRATOR]);
  }

  untilManager(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER]);
  }

  untilOperator(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER, Role.ADMIN]);
  }

  isCustomer(): boolean {
    return this.hasRoles([Role.CUSTOMER]);
  }

  isOffice(): boolean {
    return this.hasRoles([Role.ADMINISTRATION]);
  }

  isResponsible(): boolean {
    return this.hasRoles([Role.RESPONSIBLE]);
  }

  isTeacher(): boolean {
    return this.hasRoles([Role.TEACHER]);
  }

  isHeadDepartment(): boolean {
    return this.hasRoles([Role.HEAD_DEPARTMENT]);
  }

  isTutorGroup(): boolean {
    return this.hasRoles([Role.TUTOR_GROUP]);
  }

  getUsername(): string {
    return this.user ? this.user.userName : undefined;
  }

  getName(): string {
    return this.user ? this.user.name : '???';
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }
}
