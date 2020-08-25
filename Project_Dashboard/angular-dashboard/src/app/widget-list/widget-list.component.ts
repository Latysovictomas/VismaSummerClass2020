import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { widgetInterface } from './widget.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers/index';
import { getAllWidgets } from '../widget-form-management/store/widget.selectors';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetListComponent implements OnInit {


  public widgetsGroupedByColumn: widgetInterface[][] = [[],[],[]]; // [column-1, column-2, column-3]
  private widgets$: Observable<widgetInterface[]>;


  constructor(private store: Store<AppState>) { }
  
  public ngOnInit() {

    this.widgets$ = this.store.select(getAllWidgets);
    this.groupWidgetsByColumn();


  }

  private pushWidgetToColumn(widget: widgetInterface): void {
    switch (widget.column) {
      case 1:
          this.widgetsGroupedByColumn[0].push(widget);
          break;
      case 2:
          this.widgetsGroupedByColumn[1].push(widget);
          break;
      case 3:
          this.widgetsGroupedByColumn[2].push(widget);
          break;
      default:
          break;
  }
}

  private groupWidgetsByColumn():void{
    this.widgets$.subscribe( widgets => 
      {
        widgets.forEach((widget) => {
        this.pushWidgetToColumn(widget);})
      }

      );
  }
}
