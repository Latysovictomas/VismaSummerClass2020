import { widgetInterface } from '../../widget-list/widget.interface';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadWidgets = createAction(
  '[Dashboard Main Component] Load Widgets via Service',
);

export const widgetsLoaded = createAction(
  '[Dashboard Main Effect] Widgets Loaded Successfully',
  props<{widgets: widgetInterface[]}>()
);

// export const loadWidgetById = createAction(
//   '[Widget Form Component] Load Widget by id via Service',
//   props<{widgetId: string}>()
// );

// export const widgetLoadedById = createAction(
//   '[Widget Form Component] Widget by id Loaded Successfully',
//   props<{widget: widgetInterface}>()
// );

export const createWidget = createAction(
  '[Widget Form Component] Create Widget',
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
  // loadWidgetById,
  widgetsLoaded,
  // widgetLoadedById,
  createWidget,
  deleteWidget,
  updateWidget
};