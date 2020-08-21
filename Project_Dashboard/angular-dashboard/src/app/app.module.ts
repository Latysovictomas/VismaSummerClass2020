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
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
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
    mainModule,
    widgetFormModule,
    sidenavModule,
    headerModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25}),

  ],
  providers: [WidgetResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
