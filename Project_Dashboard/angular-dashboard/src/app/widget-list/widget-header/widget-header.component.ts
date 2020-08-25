import { Component, OnInit, Input } from '@angular/core';
import { widgetInterface } from '../widget.interface';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss']
})
export class WidgetHeaderComponent implements OnInit {

  public colorTheme:string;
  @Input() widget: widgetInterface;
  public routerLink:string;

  public ngOnInit(): void {
    this.routerLink = '/form';
    this.colorTheme = this.getHeaderColor(this.widget);
  }

  private getHeaderColor(widget: widgetInterface): string {
    return {
      1: 'light-theme',
      2: 'dark-theme'
    }[widget.headerType] || '';
}

}
