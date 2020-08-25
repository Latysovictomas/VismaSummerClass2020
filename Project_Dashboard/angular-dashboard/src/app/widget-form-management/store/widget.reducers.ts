import { widgetInterface } from '../../widget-list/widget.interface';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { widgetActionTypes } from './widget.actions';

export interface WidgetState extends EntityState<widgetInterface> {
  widgetsLoaded: boolean;
  error: string;
}

export const adapter: EntityAdapter<widgetInterface> = createEntityAdapter<widgetInterface>();

export const initialState = adapter.getInitialState({
  widgetsLoaded: false,
  error: ''
});

export const widgetReducer = createReducer(
  initialState,

  on(widgetActionTypes.loadWidgetsSuccess, (state, action) => {
    return adapter.addAll(
      action.widgets,
      {...state, widgetsLoaded: true}
    );
  }),

  on(widgetActionTypes.loadWidgetsFailure, (state, action) => {
    return {...state, error: action.error}
  }),

  on(widgetActionTypes.createWidgetSuccess, (state, action) => {
    return adapter.addOne(action.widget, state);
  }),

  on(widgetActionTypes.createWidgetFailure, (state, action) => {
    return {...state, error: action.error}
  }),

  on(widgetActionTypes.updateWidgetSuccess, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),

  on(widgetActionTypes.updateWidgetFailure, (state, action) => {
    return {...state, error: action.error}
  }),
  
  on(widgetActionTypes.deleteWidgetSuccess, (state, action) => {
    return adapter.removeOne(action.widgetId, state);
  }),

  on(widgetActionTypes.deleteWidgetFailure, (state, action) => {
    return {...state, error: action.error}
  }),


);

export const { selectAll } = adapter.getSelectors();