import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { WidgetFormComponent } from './widget-form/widget-form.component';
import { OverviewComponent } from './overview/overview.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard2MainComponent } from './dashboard2-main/dashboard2-main.component';
import { MessagesWidgetComponent } from './messages-widget/messages-widget.component';
import { UserListWidgetComponent } from './user-list-widget/user-list-widget.component';



@NgModule({
  declarations: [
    AppComponent,
    Dashboard2Component,
    WidgetFormComponent,
    OverviewComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardMainComponent,
    DashboardComponent,
    Dashboard2MainComponent,
    MessagesWidgetComponent,
    UserListWidgetComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
