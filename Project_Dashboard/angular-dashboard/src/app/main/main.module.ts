import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { widgetListModule } from '../widget-list/widget-list.module'
import { widgetRoutingModule } from '../widget-list/widget-routing.module'

import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { Dashboard2MainComponent } from './dashboard2-main/dashboard2-main.component';
import { OverviewComponent } from '../overview/overview.component';




@NgModule({
  declarations: [
    DashboardMainComponent,
    OverviewComponent,
    Dashboard2MainComponent
    
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    widgetListModule, 
    widgetRoutingModule],

  exports: [
    DashboardMainComponent,
    OverviewComponent
],

  providers: [],
  bootstrap: []
})
export class mainModule { }