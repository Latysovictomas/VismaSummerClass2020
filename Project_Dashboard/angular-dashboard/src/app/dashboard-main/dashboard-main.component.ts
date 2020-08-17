import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { BACKEND_URL } from "../utils/urls";
import { Widget } from '../widget';
import { RestService } from "../rest.service";
import { chatInputHTML, headerHTML, tableHTML, chatLogHTML } from "../utils/templates";

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardMainComponent implements AfterViewInit {


  public columns = new Array(3);
   

  constructor(private restService: RestService) { }

  public ngAfterViewInit(): void{
    this.init();
  }

  private init(): void {
    this.onContentLoaded();
}

private displayWidgets(widgets: Widget[]): void {
  // for each widget
  widgets.forEach((widget) => {
      let card: HTMLElement = document.createElement("section");
      if (widget.type === 1) { // userList
        this.createUserListWidget(widget, card);
      } else if (widget.type === 2) { // messages
        this.createMessageWidget(widget, card);
      }
  });
}

private createMessageWidget(widget: Widget, card: HTMLElement): void {
  card.className = "card messages-card";
  // create header
  card.insertAdjacentHTML("beforeend", headerHTML(widget, this.getHeaderColor(widget)));

  // create chat log
  let widgetDataArray: string[] = this.getWidgetDataAsArray(widget);
  card.insertAdjacentHTML("beforeend", chatLogHTML(widgetDataArray));

  // append input area below chat log
  card.insertAdjacentHTML("beforeend", chatInputHTML());

  // append to the right column
  this.setWidgetPosition(widget, card);
}


private createUserListWidget(widget: Widget, card: HTMLElement): void {
  card.className = "card userList-card";
  // create header
  card.insertAdjacentHTML("beforeend", headerHTML(widget, this.getHeaderColor(widget)));

  // create table
  let widgetDataArray: string[] = this.getWidgetDataAsArray(widget);
  card.insertAdjacentHTML("beforeend", tableHTML(widgetDataArray));

  // append to the right column
  this.setWidgetPosition(widget, card);
}

private getWidgetDataAsArray(widget: Widget): string[] {
  return Array.isArray(widget.data) ? widget.data : Array.of(widget.data);
}

private getHeaderColor(widget: Widget): string {
  switch (widget.headerType) {
      case 1:
          return "light-theme";
      case 2:
          return "dark-theme";
      default:
          break;
  }
}

private setWidgetPosition(widget: Widget, card: HTMLElement): void {
  switch (widget.column) {
      case 1:
          this.appendWidgetToColumn(1, card);
          break;
      case 2:
          this.appendWidgetToColumn(2, card);
          break;
      case 3:
          this.appendWidgetToColumn(3, card);
          break;
      default:
          break;
  }
}

private appendWidgetToColumn(columnNum: number, card: HTMLElement): void {
  
  let container: HTMLElement = document.getElementById(`column-${columnNum}`);
  container.appendChild(card);
}

private onContentLoaded() {
  // Event: Display on initial page load
   this.restService.get(BACKEND_URL).subscribe(widgets => this.displayWidgets(widgets));
  }

}
