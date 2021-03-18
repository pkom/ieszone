import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromConfig from './config.reducer';

export const getConfigState = createFeatureSelector(
  fromConfig.ConfigFeatureKey,
);

export const getStatus = createSelector(getConfigState, fromConfig.getStatus);

export const getConfig = createSelector(getConfigState, fromConfig.getConfig);

export const getCourses = createSelector(getConfigState, fromConfig.getCourses);

export const getCourseSelected = createSelector(
  getConfigState,
  fromConfig.getCourseSelected,
);

export const SelectUser = createSelector(getConfigState, fromConfig.getUser);

export const getCenter = createSelector(getConfig, (config) => config.center);

export const getDefaultCourse = createSelector(
  getConfig,
  (config) => config.defaultCourse,
);
