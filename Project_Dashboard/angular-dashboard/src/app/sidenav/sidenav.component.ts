import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public listItems: string[]  = [];
  public routerLink:string = '/dashboard2';
  private numOfListItems: number = 5;

  constructor() { }

  ngOnInit(): void {
    this.pushNavListItems();
  }

  private pushNavListItems(): void{
    for(let i=0; i<this.numOfListItems; i++){
      this.listItems.push('Dashboard2');
    }
  }

}
