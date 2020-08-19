import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard2MainComponent } from './dashboard2-main.component';

describe('Dashboard2MainComponent', () => {
  let component: Dashboard2MainComponent;
  let fixture: ComponentFixture<Dashboard2MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard2MainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard2MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
