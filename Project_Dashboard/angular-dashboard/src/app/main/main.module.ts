import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { widgetListModule } from '../widget-list/widget-list.module'

import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { Dashboard2MainComponent } from './dashboard2-main/dashboard2-main.component';
import { OverviewComponent } from '../overview/overview.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    Dashboard2MainComponent,
    OverviewComponent
    
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    widgetListModule 
    ],

  exports: [
    DashboardMainComponent,
    Dashboard2MainComponent
],

  providers: [],
  bootstrap: []
})
export class mainModule { }