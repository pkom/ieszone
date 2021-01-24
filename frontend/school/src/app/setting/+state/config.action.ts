import { createAction, props } from '@ngrx/store';
import { ConfigState } from './config.reducer';
import { Login } from '@iz/interface';

export const LoadConfig = createAction('[Config] Load Init');

export const SuccessLoadConfig = createAction(
  '[Config] Load Success',
  props<{ payload: Partial<ConfigState> }>(),
);

export const LoginUser = createAction('[Config] Login', props<Login>());

export const LogoutUser = createAction('[Config] Logout');

export const SuccessLogin = createAction(
  '[Config] Login Success',
  props<{ payload: Partial<ConfigState> }>(),
);
