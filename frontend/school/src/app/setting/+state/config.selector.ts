import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromConfig from './config.reducer';

export const getAppState = createFeatureSelector(fromConfig.SettingFeatureKey);

export const getStatus = createSelector(getAppState, fromConfig.getStatus);

export const getConfig = createSelector(getAppState, fromConfig.getConfig);

export const getCourses = createSelector(getAppState, fromConfig.getCourses);

export const getCourseSelected = createSelector(
  getAppState,
  fromConfig.getSelectedCourse,
);

export const SelectUser = createSelector(getAppState, fromConfig.getUser);

export const getCenter = createSelector(getConfig, (config) => config.center);

export const getDefaultCourse = createSelector(
  getConfig,
  (config) => config.defaultCourse,
);
