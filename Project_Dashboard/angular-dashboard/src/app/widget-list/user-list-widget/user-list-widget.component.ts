import { Component, OnInit, Input } from '@angular/core';
import { widgetInterface } from '../widget.interface';
import { getWidgetDataAsArray } from '../widget-utils';

@Component({
  selector: 'app-user-list-widget',
  templateUrl: './user-list-widget.component.html',
  styleUrls: ['./user-list-widget.component.scss']
})
export class UserListWidgetComponent implements OnInit {

  @Input() widget: widgetInterface;
  public widgetDataArray: string[];
  
  public ngOnInit(): void {
    this.widgetDataArray = getWidgetDataAsArray(this.widget);
  }

}
