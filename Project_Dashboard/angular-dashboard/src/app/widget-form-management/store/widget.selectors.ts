import { WidgetState } from './widget.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from './widget.reducers';

export const widgetFeatureSelector = createFeatureSelector<WidgetState>('widgets');

export const getAllWidgets = createSelector(
  widgetFeatureSelector,
  selectAll
);

export const getWidgetById = createSelector(
  widgetFeatureSelector,
  (state, {id}) => state.entities[id]
  );


export const areWidgetsLoaded = createSelector(
  widgetFeatureSelector,
  state => state.widgetsLoaded
);

export const getError = createSelector(
  widgetFeatureSelector,
  state => state.error
);