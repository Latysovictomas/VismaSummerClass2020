import { Component, OnInit } from '@angular/core';
import { BACKEND_URL } from '../utils/urls';
import { WidgetsService } from '../widget-list/widgets.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { widgetInterface } from '../widget-list/widget.interface';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers/index';
import { getWidgetById } from './store/widget.selectors';
import { widgetActionTypes  } from './store/widget.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit {


    public isButtonVisible: boolean;
    public widgetForm: FormGroup;
    // public widgetToBeUpdated: widgetInterface;
    private currentWidgetId:string;
    

    constructor(private widgetResource: WidgetsService, 
        private activatedRoute: ActivatedRoute, private router: Router,
        private store: Store<AppState>) { 
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
        let widgetId:string = this.currentWidgetId;
        this.store.dispatch(widgetActionTypes.deleteWidget({widgetId}));
    }

    private postOrPutFormData(widget: widgetInterface): void {
        widget.data = JSON.parse(widget.data);
        
        if (this.currentWidgetId != null) { // put request
            const update: Update<widgetInterface> = {
                id: this.currentWidgetId,
                changes: {
                  ...widget
                }
              };

            this.store.dispatch(widgetActionTypes.updateWidget({update}));
        } else { // post request
            
            this.store.dispatch(widgetActionTypes.createWidget({widget}));
        }
    }


    private fillFormByCurrentId(): void {
        if (this.currentWidgetId != null) {
            let widgetId:string = this.currentWidgetId;
            //get request to fill form
            this.store.pipe(
                select(getWidgetById(this.currentWidgetId)),
              ).subscribe((widget)=> this.widgetForm = this.generateForm(widget));


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

    private cleanData(serializedData: string): string {
        return serializedData.replace(/({)\s+/g, '{').replace(/(,)\s+/g, ',').replace(/\s*(})\s*/g, '}').replace(/\'/g, '"');
    }

}