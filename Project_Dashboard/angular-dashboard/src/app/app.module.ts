import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
//custom modules
import { widgetRoutingModule } from './widget-list/widget-routing.module'
import { mainModule } from './main/main.module'
import { widgetFormModule } from './widget-form/widget-form.module'
import { sidenavModule } from './sidenav/sidenav.module'
import { headerModule } from './header/header.module'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //custom modules
    widgetRoutingModule,
    mainModule,
    widgetFormModule,
    sidenavModule,
    headerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
