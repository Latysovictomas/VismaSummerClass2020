import { WidgetState } from './widget.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './widget.reducers';

export const widgetFeatureSelector = createFeatureSelector<WidgetState>('widgets');

export const getAllWidgets = createSelector(
  widgetFeatureSelector,
  selectAll
);

export const areWidgetsLoaded = createSelector(
  widgetFeatureSelector,
  state => state.widgetsLoaded
);