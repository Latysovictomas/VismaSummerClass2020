import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { BACKEND_URL } from '../../utils/urls';
import { widgetInterface } from '../../widget-list/widget.interface';
import { WidgetsService } from '../../widget-list/widgets.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardMainComponent implements AfterViewInit {


  public widgetsGroupedByColumn: widgetInterface[][] = [[],[],[]]; // [column-1, column-2, column-3]

  constructor(private widgetResource: WidgetsService) { }

  public ngAfterViewInit(): void {
    this.groupWidgetByColumn();
  
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

  private groupWidgetByColumn(): void {

   this.widgetResource.getWidgets(BACKEND_URL).subscribe(widgets => 
    {
      widgets.forEach((widget) => {
      this.pushWidgetToColumn(widget);})
    });
  
  }

}
