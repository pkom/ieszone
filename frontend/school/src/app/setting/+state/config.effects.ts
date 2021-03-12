import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GeneralService } from '@core/general.service';
import {
  LoadConfig,
  SuccessLoadConfig,
  LoginUser,
  SuccessLogin,
} from './config.action';
import { map, exhaustMap, switchMap } from 'rxjs/operators';
import { AuthResponse, JwtPayload } from '@iz/interface';
import { AuthService } from 'frontend/shared/src/lib/services/auth.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Injectable()
export class ConfigEffects {
  loadConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadConfig),
      switchMap(() => {
        return forkJoin([
          this.general.appStatus$,
          this.general.appConfig$,
          this.general.appCourses$,
        ]).pipe(
          map(([status, config, courses]) => {
            const token = localStorage.getItem('token');
            return SuccessLoadConfig({
              payload: {
                status,
                config,
                courses,
                user: this.decodeUser(token) || null,
              },
            });
          }),
        );
      }),
    ),
  );

  authConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginUser),
      exhaustMap((user) =>
        this.auth.login(user).pipe(
          map((response: AuthResponse) => {
            this.router.navigate(['']);
            localStorage.setItem('token', response.token);
            return SuccessLogin({
              payload: { user: this.decodeUser(response.token) },
            });
          }),
        ),
      ),
    ),
  );

  decodeUser(token): JwtPayload {
    if (token) {
      const payload = (token.split('.') || [])[1];
      const { iat, exp, __v, ...user } = JSON.parse(atob(payload));
      return user;
    }
    return null;
  }

  constructor(
    private actions$: Actions,
    private general: GeneralService,
    private auth: AuthService,
    private router: Router,
  ) {}
}
