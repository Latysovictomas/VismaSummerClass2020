import { widgetActionTypes, widgetsLoaded, updateWidget } from './widget.actions';
import { WidgetsService } from '../../widget-list/widgets.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class WidgetEffects {

  constructor(private widgetsService: WidgetsService, private actions$: Actions, private router: Router) {}


  loadWidgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(widgetActionTypes.loadWidgets),
      concatMap(() => this.widgetsService.getWidgets()),
      map(widgets => widgetActionTypes.widgetsLoaded({widgets}))
    )
  );

  createWidget$ = createEffect(() =>
  this.actions$.pipe(
    ofType(widgetActionTypes.createWidget),
    concatMap((action) => this.widgetsService.createWidget(action.widget)),
    map(widget => widgetActionTypes.widgetCreated({widget})),
    tap(() => this.redirect())
  )
);

  deleteWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(widgetActionTypes.deleteWidget),
      concatMap((action) => this.widgetsService.deleteWidget(action.widgetId)),
      tap(() => this.redirect())
    ),
    {dispatch: false}
  );

  updateWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(widgetActionTypes.updateWidget),
      concatMap((action) => this.widgetsService.updateWidget(action.update.id, action.update.changes)),
      tap(() => this.redirect())
    ),
    {dispatch: false}
  );

  private redirect(): void {
    this.router.navigateByUrl('/dashboard');
  }
}