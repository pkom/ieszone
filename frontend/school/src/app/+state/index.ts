import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {
  routerReducer,
  RouterReducerState,
  getSelectors,
} from '@ngrx/router-store';

export interface State {
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectRouter = createFeatureSelector<
  State,
  RouterReducerState<any>
>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(selectRouter);
