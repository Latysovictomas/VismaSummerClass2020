import { WidgetState } from './widget.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from './widget.reducers';

export const widgetFeatureSelector = createFeatureSelector<WidgetState>('widgets');

export const getAllWidgets = createSelector(
  widgetFeatureSelector,
  selectAll
);

export const getWidgetById = id => createSelector(
  widgetFeatureSelector,
  state => state.entities[id]
  );


export const areWidgetsLoaded = createSelector(
  widgetFeatureSelector,
  state => state.widgetsLoaded
);