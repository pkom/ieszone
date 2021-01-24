import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GeneralService } from '../../_services/general.service';
import {
  LoadConfig,
  SuccessLoadConfig,
  LoginUser,
  SuccessLogin,
} from './config.action';
import { map, mergeMap, exhaustMap, switchMap } from 'rxjs/operators';
import { AppStatus, AuthResponse, JwtPayload } from '@iz/interface';
import { AuthService } from 'frontend/shared/src/lib/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ConfigEffects {
  loadConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadConfig),
      mergeMap(() =>
        this.general.appStatus$.pipe(
          switchMap((status: AppStatus) => {
            let actions = [];
            const token = localStorage.getItem('token');
            if (token) {
              actions.push(
                SuccessLogin({
                  payload: { user: this.decodeUser(token) },
                }),
              );
            }
            actions.push(SuccessLoadConfig({ payload: { status } }));
            return actions;
          }),
        ),
      ),
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
