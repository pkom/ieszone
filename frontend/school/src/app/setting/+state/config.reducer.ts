import { AppConfig, AppStatus, Course, JwtPayload } from '@iz/interface';
import { createReducer, on } from '@ngrx/store';
import {
  LoadConfig,
  SuccessLoadConfig,
  SuccessLogin,
  LoginUser,
  LogoutUser,
} from './config.action';

export const SettingFeatureKey = 'setting';

export interface AppState {
  status: AppStatus;
  config: AppConfig;
  courses: Course[];
  selectedCourse: Course;
  user: JwtPayload;
}

export const initialState: AppState = {
  status: null,
  config: null,
  courses: [],
  selectedCourse: null,
  user: null,
};

const _settingReducer = createReducer(
  initialState,
  on(LoadConfig, LoginUser, (state) => state),
  on(LogoutUser, ({ user, ...rest }) => rest),
  on(SuccessLoadConfig, SuccessLogin, (state: AppState, { payload }) => ({
    ...state,
    ...payload,
  })),
);

export function settingReducer(state, action) {
  return _settingReducer(state, action);
}

export const getStatus = (state: AppState) => state.status;
export const getConfig = (state: AppState) => state.config;
export const getCourses = (state: AppState) => state.courses;
export const getUser = (state: AppState) => state.user;
export const getSelectedCourse = (state: AppState) => state.selectedCourse;
