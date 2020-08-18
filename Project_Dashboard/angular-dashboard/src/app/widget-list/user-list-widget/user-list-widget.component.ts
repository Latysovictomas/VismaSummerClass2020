import { Component, OnInit, Input } from '@angular/core';
import { widgetInterface } from '../widget.interface';

@Component({
  selector: 'app-user-list-widget',
  templateUrl: './user-list-widget.component.html',
  styleUrls: ['./user-list-widget.component.scss']
})
export class UserListWidgetComponent implements OnInit {

  @Input() widget: widgetInterface;
  
  constructor() { }

  ngOnInit(): void {
  }

}
