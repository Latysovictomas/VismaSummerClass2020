import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetFormComponent } from '../widget-form-management/widget-form.component';

const secondaryRoutes: Routes = [
  { path: 'form/:id',  component: WidgetFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(secondaryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class widgetRoutingModule { }