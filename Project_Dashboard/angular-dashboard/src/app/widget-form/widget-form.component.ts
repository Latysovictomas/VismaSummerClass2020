import { Component, AfterViewInit } from '@angular/core';
import { BACKEND_URL, CURRENT_WIDGET_ID } from "../utils/urls";
import { RestService } from "../rest.service";
import { Widget } from "../widget";


@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.css']
})
export class WidgetFormComponent implements AfterViewInit {

    constructor(private restService: RestService) { }

    ngAfterViewInit(): void{
        this.init();
  }

    init(): void {
        // run the fill form function
        this.fillFormByCurrentId();
        // to display or not to display button
        this.setDeleteBtnDisplay();
        // add or put widget form data
        this.addPutListener();
        // delete widget
        this.deleteListener();
}

    fillFormByCurrentId(): void {
    if (CURRENT_WIDGET_ID != null) {
        //get request to fill form
        this.restService.getById(BACKEND_URL+"/"+CURRENT_WIDGET_ID).subscribe((widget)=>this.fillForm(widget));
    } else {
        console.log("Warning: No widget id is selected.");
    }
}

 fillForm(widget: Widget): void {
    // get widget by id and fill a form
    (<HTMLInputElement>document.getElementById("title")).value = widget.title;
    (<HTMLInputElement>document.getElementById("column-number")).value = widget.column.toString();
    (<HTMLInputElement>document.getElementById("types")).value = widget.type.toString();
    (<HTMLInputElement>document.getElementById("header-types")).value = widget.headerType.toString();
    (<HTMLInputElement>document.getElementById("text-area")).value = JSON.stringify(widget.data).replace('"null"', "null");
}


 isValidJSON(text: string): boolean {
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}


 redirect(): void {
    window.location.href = "dashboard";
}

postOrPutFormData(widget: Widget): void {

    let widgetStringified: string = JSON.stringify(widget).replace('"{', "{").replace('}"', '}').replace(/\\/g, "").replace('"[', "[").replace(']"', "]");

    if (CURRENT_WIDGET_ID != null) { // put request
        this.restService.put(BACKEND_URL+"/"+CURRENT_WIDGET_ID, widgetStringified).subscribe((data)=>this.redirect());
    } else { // post request
        this.restService.post(BACKEND_URL, widgetStringified).subscribe((data)=>this.redirect());

    }
}
 setDeleteBtnDisplay(): void {
    let x: HTMLElement = document.getElementById("delete-btn");
    if (CURRENT_WIDGET_ID != null) {
        x.style.display = "inline";
    } else {
        x.style.display = "none";
    }
}


addPutListener(): void {
    // Event: Add/Edit a widget using post/put
    document.getElementById("widget-form").addEventListener("submit", (e) => {
        // Prevent fast reload
        e.preventDefault();
        // validate json
        let data: string = (<HTMLInputElement>document.getElementById("text-area")).value.trim();
        // replace white space between the following chars: { , }, and other replacements
        data = data.replace(/({)\s+/g, "{").replace(/(,)\s+/g, ",").replace(/\s*(})\s*/g, "}").replace(/\'/g, '"');
        if (!this.isValidJSON(data)) {
            alert("Data input is not valid JSON.");
        } else {
            // get form data
            let title: string = (<HTMLInputElement>document.getElementById("title")).value;
            let column: number = Number((<HTMLInputElement>document.getElementById("column-number")).value);
            let type: number = Number((<HTMLInputElement>document.getElementById("types")).value);
            let headerType: number = parseInt((<HTMLInputElement>document.getElementById("header-types")).value);
            const widget = new Widget(title, column, type, headerType, data);
            // here decide on what type of request based on current id
            this.postOrPutFormData(widget);
        }
    });
}

    deleteListener(): void {
    // Event: Delete request
    document.getElementById("delete-btn").addEventListener("click", (e) => {
        this.restService.delete(BACKEND_URL+"/"+CURRENT_WIDGET_ID).subscribe((data)=>this.redirect());
    });

}

}