import { BACKEND_URL } from "./utils/urls.js";
import { Rest } from "./utils/rest.js";
import { chatInputHTML, headerHTML, tableHTML, chatLogHTML } from "./utils/templates.js";

export class UI {

    static init() {
        UI.onContentLoaded();
    }

    static displayWidgets(widgets) {

        let mainSection = document.getElementById("main__cards");

        UI.appendColumnContainers(3, mainSection);

        // for each widget
        widgets.forEach((widget, index) => {
            let card = document.createElement("section");
            if (widget.type === 1) { // userList
                UI.createUserListWidget(widget, card);
            } else if (widget.type === 2) { // messages
                UI.createMessageWidget(widget, card);
            }
        });
    }

    static createMessageWidget(widget, card) {
        card.className = "card messages-card";
        // create header
        card.insertAdjacentHTML("beforeend", headerHTML(widget, UI.getHeaderColor(widget)));

        // create chat log
        let widgetDataArray = UI.getWidgetDataAsArray(widget);
        card.insertAdjacentHTML("beforeend", chatLogHTML(widgetDataArray));

        // append input area below chat log
        card.insertAdjacentHTML("beforeend", chatInputHTML());

        // append to the right column
        UI.setWidgetPosition(widget, card);

    }


    static createUserListWidget(widget, card) {
        card.className = "card userList-card";
        // create header
        card.insertAdjacentHTML("beforeend", headerHTML(widget, UI.getHeaderColor(widget)));

        // create table
        let widgetDataArray = UI.getWidgetDataAsArray(widget);
        card.insertAdjacentHTML("beforeend", tableHTML(widgetDataArray));

        // append to the right column
        UI.setWidgetPosition(widget, card);
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
                UI.appendWidgetToColumn(1, card);
                break;
            case 2:
                UI.appendWidgetToColumn(2, card);
                break;
            case 3:
                UI.appendWidgetToColumn(3, card);
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
        document.addEventListener("DOMContentLoaded", Rest.get(BACKEND_URL, UI.displayWidgets));
    }
}