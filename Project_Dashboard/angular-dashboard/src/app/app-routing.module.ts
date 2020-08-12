import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiComponent } from './ui/ui.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { WidgetFormComponent } from './widget-form/widget-form.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: UiComponent },
  { path: 'dashboard2', component: Dashboard2Component },
  { path: 'form', component: WidgetFormComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }