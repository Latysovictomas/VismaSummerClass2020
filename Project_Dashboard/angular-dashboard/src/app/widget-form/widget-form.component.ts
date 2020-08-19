import { Component, OnInit } from '@angular/core';
import { BACKEND_URL } from '../utils/urls';
import { WidgetsService } from '../widget-list/widgets.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { widgetInterface } from '../widget-list/widget.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit {

    public isButtonVisible: boolean;
    public widgetForm: FormGroup;
    private currentWidgetId:string;

    constructor(private widgetResource: WidgetsService, private activatedRoute: ActivatedRoute, private router: Router) { 
        this.currentWidgetId = this.activatedRoute.snapshot['params'].id;
        this.isButtonVisible = Boolean(this.currentWidgetId);
    }

    public ngOnInit(): void{
        this.fillFormByCurrentId();
  }

    public generateForm(widget ?:widgetInterface): FormGroup{
        return new FormGroup({
            title: new FormControl(widget ? widget.title : '', Validators.required),
            column: new FormControl(widget ? widget.column : null, Validators.required),
            type: new FormControl(widget ? widget.type : 1, Validators.required),
            headerType: new FormControl(widget ? widget.headerType : 1, Validators.required),
            data: new FormControl(widget ? this.stringifyIfArray(widget.data) : '', Validators.required)
          });
    }

    public onSubmit(): void {
        let serializedData: string = this.widgetForm.controls['data'].value;
        const formValue = this.widgetForm.getRawValue();
        serializedData = this.cleanData(serializedData);
        if (!this.isValidJSON(serializedData)) {
            alert('Data input is not valid JSON.');
        }
        else {
            const widget = {
                ...formValue,
                data: serializedData
            }
            // here decide on what type of request based on current id
            this.postOrPutFormData(widget);
        }

  }

    public onDelete(): void {
        this.widgetResource.deleteWidget(BACKEND_URL+'/'+this.currentWidgetId).subscribe((data)=>this.redirect());
  }

    private fillFormByCurrentId(): void {
        if (this.currentWidgetId != null) {
            //get request to fill form
            
            this.widgetResource.getWidgetById(BACKEND_URL+'/'+this.currentWidgetId).subscribe((widget)=> this.widgetForm = this.generateForm(widget));
        } else {
            console.log('Warning: No widget id is selected.');

            this.widgetForm = this.generateForm();
        }
}

    private stringifyIfArray(data): string {
        if(!Array.isArray(data)){
            return data;
        } else {
            return JSON.stringify(data);
        }
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
        this.router.navigateByUrl('/dashboard');
    }

    private getCleanStringifiedData(widget: widgetInterface): string{
        return JSON.stringify(widget)
        .replace('"{', '{').replace('}"', '}')
        .replace(/\\/g, '').replace('"[', '[')
        .replace(']"', ']').replace(/(\[n)\s+/g, '[');
    }

    private postOrPutFormData(widget: widgetInterface): void {

        let widgetStringified: string = this.getCleanStringifiedData(widget);
        if (this.currentWidgetId != null) { // put request

            this.widgetResource.putWidget(BACKEND_URL+'/'+this.currentWidgetId, widgetStringified).subscribe((data)=>this.redirect());
        } else { // post request
            this.widgetResource.postWidget(BACKEND_URL, widgetStringified).subscribe((data)=>this.redirect());

        }
    }

    private cleanData(serializedData: string): string {
        return serializedData.replace(/({)\s+/g, '{').replace(/(,)\s+/g, ',').replace(/\s*(})\s*/g, '}').replace(/\'/g, '"');
    }

}