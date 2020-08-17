import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public headerItems: object[]  = [
    {
      name: "Home",
      link: "/dashboard"
    },
    {
      name: "Dashboard2",
      link: "/dashboard2"
    },
    {
      name: "Dashboard2",
      link: "/dashboard2"
    },
    {
      name: "Dashboard2",
      link: "/dashboard2"
    },
];


  constructor() { }

  ngOnInit(): void {
  }
}
