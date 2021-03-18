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
  courseSelected: Course;
  user: JwtPayload;
}

export const initialState: ConfigState = {
  status: null,
  config: null,
  courses: [],
  courseSelected: null,
  user: null,
};

export const configReducer = createReducer(
  initialState,
  on(LoadConfig, LoginUser, (state) => state),
  on(LogoutUser, ({ user, ...rest }) => rest),
  on(SuccessLoadConfig, SuccessLogin, (state: ConfigState, { payload }) => ({
    ...state,
    ...payload,
  })),
);

export const getStatus = (state: ConfigState) => state.status;
export const getConfig = (state: ConfigState) => state.config;
export const getCourses = (state: ConfigState) => state.courses;
export const getUser = (state: ConfigState) => state.user;
export const getCourseSelected = (state: ConfigState) => state.courseSelected;
