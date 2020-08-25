import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewButtonsComponent } from './overview-buttons.component';

describe('OverviewButtonsComponent', () => {
  let component: OverviewButtonsComponent;
  let fixture: ComponentFixture<OverviewButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
