import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { widgetListModule } from '../widget-list/widget-list.module'

import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { Dashboard2MainComponent } from './dashboard2-main/dashboard2-main.component';
import { OverviewComponent } from '../overview/overview.component';

//ngrx
import { WidgetsService } from '../widget-list/widgets.service';
import { WidgetEffects } from '../widget-form-management/store/widget.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { widgetReducer } from '../widget-form-management/store/widget.reducers';



@NgModule({
  declarations: [
    DashboardMainComponent,
    Dashboard2MainComponent,
    OverviewComponent
    
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    widgetListModule,
    
    StoreModule.forFeature('widgets', widgetReducer),
    EffectsModule.forFeature([WidgetEffects])
    ],

  exports: [
    DashboardMainComponent,
    Dashboard2MainComponent
],

  providers: [WidgetsService],
  bootstrap: []
})
export class mainModule { }