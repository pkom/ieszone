import { createAction, props } from '@ngrx/store';
import { AppState } from './config.reducer';
import { Login } from '@iz/interface';

export enum ESettingActions {
  LoadConfig = '[Config] Load Init',
  SuccessLoadConfig = '[Config] Load Success',
  LoginUser = '[Config] Login',
  LogoutUser = '[Config] Logout',
  SuccessLogin = '[Config] Login Success',
}

export const LoadConfig = createAction(ESettingActions.LoadConfig);
export const SuccessLoadConfig = createAction(
  ESettingActions.SuccessLoadConfig,
  props<{ payload: Partial<AppState> }>(),
);

export const LoginUser = createAction(
  ESettingActions.LoginUser,
  props<Login>(),
);
export const LogoutUser = createAction(ESettingActions.LogoutUser);
export const SuccessLogin = createAction(
  ESettingActions.SuccessLogin,
  props<{ payload: Partial<AppState> }>(),
);
