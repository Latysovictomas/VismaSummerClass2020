import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
//custom modules
import { widgetRoutingModule } from './widget-list/widget-routing.module';
import { dashboardModule } from './dashboard/dashboard.module';
import { widgetFormModule } from './widget-form-management/widget-form.module';
import { sidenavModule } from './sidenav/sidenav.module';
import { headerModule } from './header/header.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//ngrx
import { EffectsModule } from '@ngrx/effects';
//route resolver
import { WidgetResolver} from './widget-list/widget.resolver';


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
    dashboardModule,
    widgetFormModule,
    sidenavModule,
    headerModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({maxAge: 25}),

  ],
  providers: [WidgetResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
