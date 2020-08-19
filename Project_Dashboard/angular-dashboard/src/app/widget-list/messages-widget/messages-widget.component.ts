import { Component, OnInit, Input } from '@angular/core';
import { widgetInterface } from '../widget.interface';
import { getWidgetDataAsArray } from '../widget-utils';

@Component({
  selector: 'app-messages-widget',
  templateUrl: './messages-widget.component.html',
  styleUrls: ['./messages-widget.component.scss']
})
export class MessagesWidgetComponent implements OnInit {

  @Input() widget: widgetInterface;
  public widgetDataArray: string[];

  public ngOnInit(): void {
    this.widgetDataArray = getWidgetDataAsArray(this.widget);
  }

}
