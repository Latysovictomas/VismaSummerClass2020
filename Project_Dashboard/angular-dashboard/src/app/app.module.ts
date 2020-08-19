import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { mainModule } from './main/main.module'

import { AppComponent } from './app.component';
import { WidgetFormComponent } from './widget-form/widget-form.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    WidgetFormComponent,
    SidenavComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    mainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
