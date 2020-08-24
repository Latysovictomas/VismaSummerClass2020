import { widgetInterface } from '../../widget-list/widget.interface';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { widgetActionTypes, widgetsLoaded } from './widget.actions';

export interface WidgetState extends EntityState<widgetInterface> {
  widgetsLoaded: boolean;
}

export const adapter: EntityAdapter<widgetInterface> = createEntityAdapter<widgetInterface>();

export const initialState = adapter.getInitialState({
  widgetsLoaded: false
});

export const widgetReducer = createReducer(
  initialState,

  on(widgetActionTypes.widgetsLoaded, (state, action) => {
    return adapter.addAll(
      action.widgets,
      {...state, widgetsLoaded: true}
    );
  }),

  on(widgetActionTypes.widgetCreated, (state, action) => {
    return adapter.addOne(action.widget, state);
  }),
  
  on(widgetActionTypes.deleteWidget, (state, action) => {
    return adapter.removeOne(action.widgetId, state);
  }),

  on(widgetActionTypes.updateWidget, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),
);

export const { selectAll } = adapter.getSelectors();