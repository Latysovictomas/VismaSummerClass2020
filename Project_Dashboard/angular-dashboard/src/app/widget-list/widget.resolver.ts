import { areWidgetsLoaded } from '../widget-form-management/store/widget.selectors';
import { widgetActionTypes } from '../widget-form-management/store/widget.actions';
import { AppState } from '../store/reducers/index';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, first, tap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

// WidgetListComponent uses a resolver to fetch data.
// A route resolver is responsible for retrieving the widget list
// and ensures its ready to use by the component
// before navigating to a /dashboard

@Injectable()
export class WidgetResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areWidgetsLoaded),
        tap((widgetsLoaded) => {
          
          if (!widgetsLoaded) {
            this.store.dispatch(widgetActionTypes.loadWidgets());
            this.actions$.pipe(ofType(widgetActionTypes.loadWidgetsFailure), take(1)).subscribe(() => 
        alert("Failed to load widgets. Try again later or contact support."));
          } 
        }),
        filter(widgetsLoaded => widgetsLoaded),
        first()
    );
  }
}