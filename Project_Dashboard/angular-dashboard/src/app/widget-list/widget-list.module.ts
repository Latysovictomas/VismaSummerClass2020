import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';

import { MessagesWidgetComponent } from './messages-widget/messages-widget.component';
import { UserListWidgetComponent } from './user-list-widget/user-list-widget.component';
import { WidgetHeaderComponent } from './widget-header/widget-header.component';








@NgModule({
  declarations: [
    MessagesWidgetComponent,
    UserListWidgetComponent,
    WidgetHeaderComponent
    
  ],
  imports: [CommonModule, RouterModule
  ],

  exports: [
    MessagesWidgetComponent,
    UserListWidgetComponent,
    WidgetHeaderComponent],

  providers: [],
  bootstrap: []
})
export class widgetListModule { }