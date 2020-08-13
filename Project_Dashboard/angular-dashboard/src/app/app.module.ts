import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { WidgetFormComponent } from './widget-form/widget-form.component';
import { OverviewComponent } from './overview/overview.component';



@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    Dashboard2Component,
    WidgetFormComponent,
    OverviewComponent
    
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
