import { widgetInterface } from '../../widget-list/widget.interface';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadWidgets = createAction(
  '[Dashboard Main Component] Load Widgets via Service',
);

export const widgetsLoaded = createAction( //not used directly
  '[Dashboard Main Effect] Widgets Loaded Successfully',
  props<{widgets: widgetInterface[]}>()
);

export const createWidget = createAction(
  '[Widget Form Component] Create Widget',
  props<{widget: widgetInterface}>()
);

export const widgetCreated = createAction( //not used directly
  '[Widget Form Component] Widget created with id from backend',
  props<{widget: widgetInterface}>()
);

export const deleteWidget = createAction(
  '[Widget form Component] Delete Widget',
  props<{widgetId: string}>()
);

export const updateWidget = createAction(
  '[Widget Form Component] Update Widget',
  props<{update: Update<widgetInterface>}>()
);

export const widgetActionTypes = {
  loadWidgets,
  widgetsLoaded,
  createWidget,
  deleteWidget,
  updateWidget,
  widgetCreated
};