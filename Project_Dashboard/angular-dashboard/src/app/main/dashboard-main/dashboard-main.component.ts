import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { widgetInterface } from '../../widget-list/widget.interface';
import { WidgetsService } from '../../widget-list/widgets.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { getAllWidgets } from '../../widget-form/store/widget.selectors';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardMainComponent implements OnInit {


  public widgetsGroupedByColumn: widgetInterface[][] = [[],[],[]]; // [column-1, column-2, column-3]
  private widgets$: Observable<widgetInterface[]>;


  constructor(private widgetResource: WidgetsService, private store: Store<AppState>) { }
  
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
