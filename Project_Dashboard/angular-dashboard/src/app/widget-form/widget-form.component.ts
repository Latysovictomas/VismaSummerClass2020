import { Component, OnInit } from '@angular/core';
import { BACKEND_URL, CURRENT_WIDGET_ID } from "../utils/urls";
import { Rest } from "../utils/rest.js";
import { Widget } from "../widget";



@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.css']
})
export class WidgetFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
}

  ngAfterViewInit(): void{
    WidgetFormComponent.init();
  }

  static init() {
    // run the fill form function
    WidgetFormComponent.fillFormByCurrentId();
    // to display or not to display button
    WidgetFormComponent.setDeleteBtnDisplay();
    // add or put widget form data
    WidgetFormComponent.addPutListener();
    // delete widget
    WidgetFormComponent.deleteListener();
}

static fillFormByCurrentId() {
    if (CURRENT_WIDGET_ID != null) {
        //get request to fill form
        Rest.get(BACKEND_URL, WidgetFormComponent.fillForm, CURRENT_WIDGET_ID);
    } else {
        console.log("Warning: No widget id is selected.");
    }
}

static fillForm(widget) {
    // get widget by id and fill a form
    (<HTMLInputElement>document.getElementById("title")).value = widget.title;
    (<HTMLInputElement>document.getElementById("column-number")).value = widget.column;
    (<HTMLInputElement>document.getElementById("types")).value = widget.type;
    (<HTMLInputElement>document.getElementById("header-types")).value = widget.headerType;
    (<HTMLInputElement>document.getElementById("text-area")).value = JSON.stringify(widget.data).replace('"null"', "null");
}


static isValidJSON(text) {
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}


static redirect() {
    window.location.href = "dashboard";
}

static postOrPutFormData(widget) {

    var widgetStringified = JSON.stringify(widget).replace('"{', "{").replace('}"', '}').replace(/\\/g, "").replace('"[', "[").replace(']"', "]");

    if (CURRENT_WIDGET_ID != null) { // put request
        Rest.put(BACKEND_URL, WidgetFormComponent.redirect, widgetStringified, CURRENT_WIDGET_ID);
    } else { // post request
        Rest.post(BACKEND_URL, WidgetFormComponent.redirect, widgetStringified, CURRENT_WIDGET_ID);
    }
}
static setDeleteBtnDisplay() {
    var x = document.getElementById("delete-btn");
    if (CURRENT_WIDGET_ID != null) {
        x.style.display = "inline";
    } else {
        x.style.display = "none";
    }
}


static addPutListener() {
    // Event: Add/Edit a widget using post/put
    document.getElementById("widget-form").addEventListener("submit", (e) => {
        // Prevent fast reload
        e.preventDefault();
        // validate json
        var data = (<HTMLInputElement>document.getElementById("text-area")).value.trim();
        // replace white space between the following chars: { , }, and other replacements
        data = data.replace(/({)\s+/g, "{").replace(/(,)\s+/g, ",").replace(/\s*(})\s*/g, "}").replace(/\'/g, '"');
        if (!WidgetFormComponent.isValidJSON(data)) {
            alert("Data input is not valid JSON.");
        } else {
            // get form data
            var title = (<HTMLInputElement>document.getElementById("title")).value;
            var column = Number((<HTMLInputElement>document.getElementById("column-number")).value);
            var type = Number((<HTMLInputElement>document.getElementById("types")).value);
            var headerType = parseInt((<HTMLInputElement>document.getElementById("header-types")).value);
            const widget = new Widget(title, column, type, headerType, data);
            // here decide on what type of request based on current id
            WidgetFormComponent.postOrPutFormData(widget);
        }
    });
}


static deleteListener() {
    // Event: Delete request
    document.getElementById("delete-btn").addEventListener("click", (e) => {
        Rest.delete(BACKEND_URL, WidgetFormComponent.redirect, CURRENT_WIDGET_ID);
    });

}

}
