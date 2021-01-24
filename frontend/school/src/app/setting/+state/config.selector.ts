import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigFeatureKey, ConfigState } from './config.reducer';

export const SelectConfig = createFeatureSelector(ConfigFeatureKey);

export const SelectStatus = createSelector(
  SelectConfig,
  (state: ConfigState) => state.status,
);

export const SelectUser = createSelector(
  SelectConfig,
  (state: ConfigState) => state.user,
);
