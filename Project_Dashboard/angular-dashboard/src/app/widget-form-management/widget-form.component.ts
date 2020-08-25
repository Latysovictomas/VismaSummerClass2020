import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { widgetInterface } from '../widget-list/widget.interface';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers/index';
import { getWidgetById, getError } from './store/widget.selectors';
import { widgetActionTypes  } from './store/widget.actions';
import { Update } from '@ngrx/entity';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit {


    public isButtonVisible: boolean;
    public widgetForm: FormGroup;
    private currentWidgetId:string;
    

    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private store: Store<AppState>, private actions$: Actions) { 
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
        serializedData = this.getCleanData(serializedData);
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

        this.actions$.pipe(ofType(...[widgetActionTypes.createWidgetFailure, widgetActionTypes.updateWidgetFailure]), take(1)).subscribe(() => 
        alert("Failed to perform an operation. Try again later or contact support."));

  }

    public onDelete(): void {
        let widgetId:string = this.currentWidgetId;
        this.store.dispatch(widgetActionTypes.deleteWidget({widgetId}));
        this.actions$.pipe(ofType(widgetActionTypes.deleteWidgetFailure), take(1)).subscribe(() => 
        alert("Failed to perform delete operation. Try again later or contact support."));
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

    private getCleanData(serializedData: string): string {
        return serializedData.replace(/({)\s+/g, '{').replace(/(,)\s+/g, ',').replace(/\s*(})\s*/g, '}').replace(/\'/g, '"');
    }

}