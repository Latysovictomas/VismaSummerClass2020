import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { WidgetFormComponent } from './widget-form.component';

//ngrx
import { WidgetEffects } from './store/widget.effects';
import { WidgetsService } from '../widget-list/widgets.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { widgetReducer } from './store/widget.reducers';


@NgModule({
  declarations: [
    WidgetFormComponent
    
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
    StoreModule.forFeature('widgets', widgetReducer),
    EffectsModule.forFeature([WidgetEffects])],

  exports: [
    WidgetFormComponent
],

  providers: [WidgetsService],
  bootstrap: []
})
export class widgetFormModule { }