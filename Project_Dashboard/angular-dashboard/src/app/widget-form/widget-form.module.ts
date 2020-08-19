import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { WidgetFormComponent } from './widget-form.component';


@NgModule({
  declarations: [
    WidgetFormComponent
    
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule],

  exports: [
    WidgetFormComponent
],

  providers: [],
  bootstrap: []
})
export class widgetFormModule { }