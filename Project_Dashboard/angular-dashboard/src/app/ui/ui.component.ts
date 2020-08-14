import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { BACKEND_URL } from "../utils/urls";
import { Widget } from '../widget';
import { RestService } from "../rest.service";
import { chatInputHTML, headerHTML, tableHTML, chatLogHTML } from "../utils/templates";



@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'], 
  encapsulation: ViewEncapsulation.None,
  
})
export class UiComponent implements AfterViewInit {

  columns = new Array(3);
   

  constructor(private restService: RestService) { }

  ngAfterViewInit(): void{
    this.init();
  }

  init(): void {
    this.onContentLoaded();
}


displayWidgets(widgets: Widget[]): void {
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

createMessageWidget(widget: Widget, card: HTMLElement): void {
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


createUserListWidget(widget: Widget, card: HTMLElement): void {
    card.className = "card userList-card";
    // create header
    card.insertAdjacentHTML("beforeend", headerHTML(widget, this.getHeaderColor(widget)));

    // create table
    let widgetDataArray: string[] = this.getWidgetDataAsArray(widget);
    card.insertAdjacentHTML("beforeend", tableHTML(widgetDataArray));

    // append to the right column
    this.setWidgetPosition(widget, card);
}

getWidgetDataAsArray(widget: Widget): string[] {
    return Array.isArray(widget.data) ? widget.data : Array.of(widget.data);
}

getHeaderColor(widget: Widget): string {
    switch (widget.headerType) {
        case 1:
            return "light-theme";
        case 2:
            return "dark-theme";
        default:
            break;
    }
}

setWidgetPosition(widget: Widget, card: HTMLElement): void {
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

appendWidgetToColumn(columnNum: number, card: HTMLElement): void {
    
    let container: HTMLElement = document.getElementById(`column-${columnNum}`);
    container.appendChild(card);
}

onContentLoaded() {
    // Event: Display on initial page load
     this.restService.get(BACKEND_URL).subscribe(widgets => this.displayWidgets(widgets));
    }


}
