import { widgetActionTypes } from './widget.actions';
import { WidgetsService } from '../../widget-list/widgets.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { widgetInterface } from 'src/app/widget-list/widget.interface';

@Injectable()
export class WidgetEffects {

  constructor(private widgetsService: WidgetsService, private actions$: Actions, private router: Router) {}


  loadWidgets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(widgetActionTypes.loadWidgets),
      concatMap(() => 
      this.widgetsService.getWidgets()
      .pipe(
        map(widgets => widgetActionTypes.loadWidgetsSuccess({widgets})),
        catchError(error => of(widgetActionTypes.loadWidgetsFailure({ error })))
        )
      )
    );
  });

  createWidget$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(widgetActionTypes.createWidget),
    concatMap((action) => 
    this.widgetsService.createWidget(action.widget)
    .pipe(
      map(widget => widgetActionTypes.createWidgetSuccess({widget})),
      tap(() => this.redirect()),
      catchError(error => of(widgetActionTypes.createWidgetFailure({ error })))
      )
    )
  );
});

  deleteWidget$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(widgetActionTypes.deleteWidget),
      concatMap((action) => 
      this.widgetsService.deleteWidget(action.widgetId)
      .pipe(
        map(() => widgetActionTypes.deleteWidgetSuccess({widgetId: action.widgetId})),
        tap(() => this.redirect()),
        catchError(error => of(widgetActionTypes.deleteWidgetFailure({ error })))
        )
      )
    );
  });



  updateWidget$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(widgetActionTypes.updateWidget),
      concatMap((action) => 
      this.widgetsService.updateWidget(action.update.id, action.update.changes)
      .pipe(
        map(widget => {
          const update: Update<widgetInterface> = {
            id: widget.id,
            changes: {
              ...widget
            }
          };
          return widgetActionTypes.updateWidgetSuccess({update})}
          ),
        tap(() => this.redirect()),
        catchError(error => of(widgetActionTypes.updateWidgetFailure({ error })))
        )
      )
    );
  });

  private redirect(): void {
    this.router.navigateByUrl('/dashboard');
  }
}