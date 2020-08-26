import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { widgetInterface } from './widget.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers/index';
import { getAllWidgets } from '../widget-form-management/store/widget.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetListComponent implements OnInit {


  public widgetsGroupedByColumn: widgetInterface[][] = [[],[],[]]; // [column-1, column-2, column-3]
  private widgets$ = this.store.select(getAllWidgets);


  constructor(private store: Store<AppState>) { }
  
  public ngOnInit() {
    this.groupWidgetsByColumn();
  }

  private groupWidgetsByColumn():void{
    this.widgets$.pipe(take(1)).subscribe( widgets => widgets.forEach((widget) => {
          this.widgetsGroupedByColumn[widget.column - 1].push(widget);
        }
          ));
  }



}
