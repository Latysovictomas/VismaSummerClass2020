import { Component, AfterViewInit } from "@angular/core";
import { BACKEND_URL } from "../utils/urls";
import { RestService } from "../rest.service";
import { Widget } from "../widget-list/widget";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
// import { widgetInterface } from '../widget-list/widget.interface';

@Component({
  selector: "app-widget-form",
  templateUrl: "./widget-form.component.html",
  styleUrls: ["./widget-form.component.scss"]
})
export class WidgetFormComponent implements AfterViewInit {

    private currentWidgetId:string;
    public isButtonVisible: boolean;

    public widgetForm  = new FormGroup({
        title: new FormControl("", Validators.required),
        column: new FormControl("", Validators.required),
        type: new FormControl("", Validators.required),
        headerType: new FormControl("", Validators.required),
        data: new FormControl("", Validators.required)
      });

    constructor(private restService: RestService, private activatedRoute: ActivatedRoute) { 
        this.currentWidgetId = this.activatedRoute.snapshot["params"].id;
        this.isButtonVisible = Boolean(this.currentWidgetId);
    }

  public ngAfterViewInit(): void{
        this.init();
  }

  private init(): void {
        // run the fill form function
        this.fillFormByCurrentId();
}

private fillFormByCurrentId(): void {
    if (this.currentWidgetId != null) {
        //get request to fill form
        this.restService.getById(BACKEND_URL+"/"+this.currentWidgetId).subscribe((widget)=>this.fillForm(widget));
    } else {
        console.log("Warning: No widget id is selected.");
    }
}

private fillForm(widget: Widget): void {
    this.widgetForm.setValue({
        title: widget.title,
        column: widget.column.toString(),
        type: widget.type.toString(),
        headerType: widget.headerType.toString(),
        data: JSON.stringify(widget.data).replace('"null"', "null")
     });
}


private isValidJSON(text: string): boolean {
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}


private redirect(): void {
    window.location.href = "dashboard";
}

private getCleanStringifiedData(widget: Widget): string{
    return JSON.stringify(widget)
    .replace('"{', "{").replace('}"', '}')
    .replace(/\\/g, "").replace('"[', "[")
    .replace(']"', "]").replace(/(\[n)\s+/g, "[");
}

private postOrPutFormData(widget: Widget): void {

    let widgetStringified: string = this.getCleanStringifiedData(widget);
    if (this.currentWidgetId != null) { // put request

        this.restService.put(BACKEND_URL+"/"+this.currentWidgetId, widgetStringified).subscribe((data)=>this.redirect());
    } else { // post request
        this.restService.post(BACKEND_URL, widgetStringified).subscribe((data)=>this.redirect());

    }
}

public onSubmit(): void {
    // TODO: Use EventEmitter with form value
    let data: string = this.widgetForm.controls["data"].value
    data = data.replace(/({)\s+/g, "{").replace(/(,)\s+/g, ",").replace(/\s*(})\s*/g, "}").replace(/\'/g, '"');
    if (!this.isValidJSON(data)) {
        alert("Data input is not valid JSON.");
     }else {

        let title: string = this.widgetForm.controls["title"].value
        let column: number = Number(this.widgetForm.controls["column"].value);
        let type: number = Number(this.widgetForm.controls["type"].value);
        let headerType: number = parseInt(this.widgetForm.controls["headerType"].value);
        const widget = new Widget(title, column, type, headerType, data);
        // here decide on what type of request based on current id
        this.postOrPutFormData(widget);
     }

  }

  public onDelete(): void {
    this.restService.delete(BACKEND_URL+"/"+this.currentWidgetId).subscribe((data)=>this.redirect());
  }

}