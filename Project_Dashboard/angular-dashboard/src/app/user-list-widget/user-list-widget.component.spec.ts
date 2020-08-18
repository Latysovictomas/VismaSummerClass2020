import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListWidgetComponent } from './user-list-widget.component';

describe('UserListWidgetComponent', () => {
  let component: UserListWidgetComponent;
  let fixture: ComponentFixture<UserListWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
