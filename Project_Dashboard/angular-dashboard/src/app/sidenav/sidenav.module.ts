import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav.component';




@NgModule({
  declarations: [
    SidenavComponent
    
  ],
  imports: [
    CommonModule, RouterModule],

  exports: [
    SidenavComponent
],

  providers: [],
  bootstrap: []
})
export class sidenavModule { }