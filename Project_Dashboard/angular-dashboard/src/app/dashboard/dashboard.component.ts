import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  public currentDashboardView: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.setCurrentPath(this.activatedRoute.snapshot["_routerState"].url);

    
  }

  private setCurrentPath(url:string){
    switch (url) {
      case "/dashboard":
          this.currentDashboardView = 1;
          break;
      case "/dashboard2":
          this.currentDashboardView = 2;
          break;
      default:
          break;
  }
  }

}