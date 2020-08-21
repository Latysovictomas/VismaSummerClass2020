import { areWidgetsLoaded } from '../widget-form/store/widget.selectors';
import { loadWidgets } from '../widget-form/store/widget.actions';
import { AppState } from '../store/reducers/index';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, first, tap } from 'rxjs/operators';

// DashboardMainComponent uses a resolver to fetch data.
// A route resolver is responsible for retrieving the widget list
// and ensures its ready to use by the component
// before navigating to a /dashboard

@Injectable()
export class WidgetResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areWidgetsLoaded),
        tap((widgetsLoaded) => {
          if (!widgetsLoaded) {
            this.store.dispatch(loadWidgets());
          }
          
        }),
        filter(widgetsLoaded => widgetsLoaded),
        first()
    );
  }
}