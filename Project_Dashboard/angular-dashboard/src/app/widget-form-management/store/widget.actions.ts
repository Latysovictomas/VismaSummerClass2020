import { widgetInterface } from '../../widget-list/widget.interface';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


export const loadWidgets = createAction(
  '[Widget List Component] Load Widgets via Service',
);

export const loadWidgetsSuccess = createAction(
  '[Widget List Route Resolver] Widgets Loaded Successfully',
  props<{widgets: widgetInterface[]}>()
);

export const loadWidgetsFailure = createAction(
  '[Widget List Route Resolver] Widgets Failed to Load',
  props<{error: string }>()
);

export const createWidget = createAction(
  '[Widget Form Component] Create Widget',
  props<{widget: widgetInterface}>()
);

export const createWidgetSuccess = createAction(
  '[Widget Form Component] Widget Created with Id from Backend Successfully',
  props<{widget: widgetInterface}>()
);

export const createWidgetFailure = createAction(
  '[Widget Form Component] Widget Failed to Create',
  props<{error: string }>()
);

export const deleteWidget = createAction(
  '[Widget form Component] Delete Widget',
  props<{widgetId: string}>()
);

export const deleteWidgetSuccess = createAction(
  '[Widget form Component] Widget Deleted Successfully',
  props<{widgetId: string}>()
);

export const deleteWidgetFailure = createAction(
  '[Widget form Component] Widget Failed to Delete',
  props<{error: string }>()
);

export const updateWidget = createAction(
  '[Widget Form Component] Update Widget',
  props<{update: Update<widgetInterface>}>()
);

export const updateWidgetSuccess = createAction(
  '[Widget Form Component] Widget Updated Successfully',
  props<{update: Update<widgetInterface>}>()
);
export const updateWidgetFailure = createAction(
  '[Widget Form Component] Widget Failed to Update',
  props<{error: string }>()
);

export const widgetActionTypes = {
  loadWidgets,
  loadWidgetsSuccess,
  loadWidgetsFailure,
  createWidget,
  createWidgetSuccess,
  createWidgetFailure,
  deleteWidget,
  deleteWidgetSuccess,
  deleteWidgetFailure,
  updateWidget,
  updateWidgetSuccess,
  updateWidgetFailure
};