import { Component, OnInit } from '@angular/core';

import { BACKEND_URL } from "../utils/urls";
import { Rest } from "../utils/rest";
import { chatInputHTML, headerHTML, tableHTML, chatLogHTML } from "../utils/templates";


@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    UiComponent.init();
  }

  static init() {
    UiComponent.onContentLoaded();
}

static displayWidgets(widgets) {

    let mainSection = document.getElementById("main__cards");

    UiComponent.appendColumnContainers(3, mainSection);

    // for each widget
    widgets.forEach((widget, index) => {
        let card = document.createElement("section");
        if (widget.type === 1) { // userList
          UiComponent.createUserListWidget(widget, card);
        } else if (widget.type === 2) { // messages
          UiComponent.createMessageWidget(widget, card);
        }
    });
}

static createMessageWidget(widget, card) {
    card.className = "card messages-card";
    // create header
    card.insertAdjacentHTML("beforeend", headerHTML(widget, UiComponent.getHeaderColor(widget)));

    // create chat log
    let widgetDataArray = UiComponent.getWidgetDataAsArray(widget);
    card.insertAdjacentHTML("beforeend", chatLogHTML(widgetDataArray));

    // append input area below chat log
    card.insertAdjacentHTML("beforeend", chatInputHTML());

    // append to the right column
    UiComponent.setWidgetPosition(widget, card);

}


static createUserListWidget(widget, card) {
    card.className = "card userList-card";
    // create header
    card.insertAdjacentHTML("beforeend", headerHTML(widget, UiComponent.getHeaderColor(widget)));

    // create table
    let widgetDataArray = UiComponent.getWidgetDataAsArray(widget);
    card.insertAdjacentHTML("beforeend", tableHTML(widgetDataArray));

    // append to the right column
    UiComponent.setWidgetPosition(widget, card);
}

static getWidgetDataAsArray(widget) {
    return Array.isArray(widget.data) ? widget.data : Array.of(widget.data);
}

static getHeaderColor(widget) {
    switch (widget.headerType) {
        case 1:
            return "light-theme";
        case 2:
            return "dark-theme";
        default:
            break;
    }
}

static setWidgetPosition(widget, card) {
    switch (widget.column) {
        case 1:
          UiComponent.appendWidgetToColumn(1, card);
            break;
        case 2:
          UiComponent.appendWidgetToColumn(2, card);
            break;
        case 3:
          UiComponent.appendWidgetToColumn(3, card);
            break;
        default:
            break;
    }
}

static appendWidgetToColumn(columnNum, card) {
    let container = document.getElementById(`column-${columnNum}`);
    container.appendChild(card);
}

static appendColumnContainers(columnNum, mainSectionElement) {
    let container;
    for (let i = 0; i < columnNum; i++) {
        container = `<div id="column-${i + 1}"></div>`;
        mainSectionElement.insertAdjacentHTML("beforeend", container);
    }
}

static onContentLoaded() {
    // Event: Display on initial page load
    // document.addEventListener("DOMContentLoaded", Rest.get(BACKEND_URL, UiComponent.displayWidgets));
    Rest.get(BACKEND_URL, UiComponent.displayWidgets);
}


}
