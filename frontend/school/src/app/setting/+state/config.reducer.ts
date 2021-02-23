import { AppConfig, AppStatus, Course, JwtPayload } from '@iz/interface';
import { createReducer, on } from '@ngrx/store';
import {
  LoadConfig,
  SuccessLoadConfig,
  SuccessLogin,
  LoginUser,
  LogoutUser,
} from './config.action';

export const ConfigFeatureKey = 'config';

export interface ConfigState {
  status: AppStatus;
  config: AppConfig;
  courses: Course[];
  user: JwtPayload;
}

export const initConfig: ConfigState = {
  status: null,
  config: null,
  courses: [],
  user: null,
};

export const configReducer = createReducer(
  initConfig,
  on(LoadConfig, LoginUser, (state) => state),
  on(LogoutUser, ({ user, ...rest }) => rest),
  on(SuccessLoadConfig, SuccessLogin, (state: ConfigState, { payload }) => ({
    ...state,
    ...payload,
  })),
);
