import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { widgetListModule } from './widget-list/widget-list.module'
import { widgetRoutingModule } from './widget-list/widget-routing.module'

import { AppComponent } from './app.component';
import { WidgetFormComponent } from './widget-form/widget-form.component';
import { OverviewComponent } from './overview/overview.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard2MainComponent } from './dashboard2-main/dashboard2-main.component';



@NgModule({
  declarations: [
    AppComponent,
    WidgetFormComponent,
    OverviewComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardMainComponent,
    DashboardComponent,
    Dashboard2MainComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    widgetListModule,
    widgetRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
