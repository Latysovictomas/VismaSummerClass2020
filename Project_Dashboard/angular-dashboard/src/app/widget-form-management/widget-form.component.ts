import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { widgetInterface } from '../widget-list/widget.interface';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers/index';
import { getWidgetById } from './store/widget.selectors';
import  * as widgetActionTypes from './store/widget.actions';
import { Update } from '@ngrx/entity';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';
import { WidgetsService } from '../widget-list/widgets.service';

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
        private store: Store<AppState>, private actions$: Actions,
        private widgetsService: WidgetsService) { }

    public ngOnInit(): void {
        this.currentWidgetId = this.activatedRoute.snapshot['params'].id;
        this.isButtonVisible = Boolean(this.currentWidgetId);
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
        const formValue = this.widgetForm.getRawValue();
        let serializedData: string = this.getCleanData(formValue.data);
        if (!this.isValidJSON(serializedData)) {
            alert('Data input is not valid JSON.');
        }
        else {
            const widget = {...formValue, data: JSON.parse(serializedData)};
            // here decide on what type of request based on current id
            this.currentWidgetId === undefined ? this.postFormData(widget) : this.putFormData(widget);
        }

        // redirect from the component on success
        this.actions$.pipe(ofType(...[widgetActionTypes.createWidgetSuccess, widgetActionTypes.updateWidgetSuccess]), take(1)).subscribe(()=>
        this.redirect())
    
  }

    public onDelete(): void {
        let widgetId:string = this.currentWidgetId;
        this.store.dispatch(widgetActionTypes.deleteWidget({widgetId}));
         // redirect from the component on success
        this.actions$.pipe(ofType(widgetActionTypes.deleteWidgetSuccess), take(1)).subscribe(()=>
        this.redirect())
    }

    private postFormData(widget: widgetInterface): void {
        this.store.dispatch(widgetActionTypes.createWidget({widget}));
    }

    private putFormData(widget: widgetInterface): void {
        const update: Update<widgetInterface> = {
            id: this.currentWidgetId,
            changes: {
              ...widget
            }
          };
        this.store.dispatch(widgetActionTypes.updateWidget({update}));
    }

    private fillFormByCurrentId(): void {
        if (this.currentWidgetId != null) {
            //get request to fill form
            this.widgetsService.getWidgetById(this.currentWidgetId).subscribe((widget)=>
             this.widgetForm = this.generateForm(widget));

        } else {
            console.log('Warning: No widget id is selected.');

            this.widgetForm = this.generateForm();
        }
}

    private stringifyIfArray(data): string {
        return !Array.isArray(data) ? data : JSON.stringify(data);
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

    private redirect(): void {
        this.router.navigateByUrl('/dashboard');
      }

}