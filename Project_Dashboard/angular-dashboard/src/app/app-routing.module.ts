import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetFormComponent } from './widget-form/widget-form.component';
import { DashboardMainComponent } from './main/dashboard-main/dashboard-main.component';
import { Dashboard2MainComponent } from './main/dashboard2-main/dashboard2-main.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardMainComponent },
  { path: 'dashboard2', component: Dashboard2MainComponent },
  { path: 'form', component: WidgetFormComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }