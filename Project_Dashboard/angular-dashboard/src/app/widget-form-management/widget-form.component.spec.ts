import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { WidgetFormComponent } from './widget-form.component';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Subject, throwError, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router, ActivatedRoute } from '@angular/router';
import  * as widgetActionTypes from './store/widget.actions';
import { HttpClientModule } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import { widgetInterface } from '../widget-list/widget.interface';


describe('WidgetFormComponent', () => {
  const actions$ = new Subject(); 
  let component: WidgetFormComponent;
  let fixture: ComponentFixture<WidgetFormComponent>;
  let store$: MockStore<any>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let widgetForm = new FormGroup({
    title: new FormControl(''),
    column: new FormControl(null),
    type: new FormControl(1),
    headerType: new FormControl(1),
    data: new FormControl('')
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ WidgetFormComponent ],
      providers: [provideMockStore(), provideMockActions(actions$),
      {provide: Router,
      useValue: {navigateByUrl: jasmine.createSpy('navigateByUrl')}},
      {provide: ActivatedRoute,
      useValue: {
        snapshot: {params: {id : '5'}}
        }
      }
    
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetFormComponent);
    component = fixture.componentInstance;
    store$ = TestBed.inject(Store) as MockStore<any>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  // describe('getCleanData', () => {
  //   it('should serialize data to JSON suitable format', () => {
  //   });
  // });


  describe('onSubmit', () => {
    it('should navigate when createWidgetSuccess or updateWidgetSuccess to /dashboard', () => {
      component.widgetForm = widgetForm;
      let testId: number = 5;
      let widget = {    
        id : testId,
        title: 'MyTile',
        column: 3,
        type: 1,
        headerType: 2,
        data: ''
      };
      const update: Update<widgetInterface> = {
        id: testId,
        changes: {
          ...widget
        }
      };
      component.onSubmit();
      actions$.next(...[widgetActionTypes.createWidgetSuccess({widget}), widgetActionTypes.updateWidgetSuccess({update})]);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });
  });


  describe('onDelete', () => {
    

    it('should dispatch deleteWidget action', () => {
      spyOn(store$, 'dispatch');  
      
      component.ngOnInit();    
      component.onDelete();

      let widgetId: string = TestBed.get(ActivatedRoute).snapshot['params'].id;
      expect(store$.dispatch).toHaveBeenCalledWith(widgetActionTypes.deleteWidget({widgetId}));
      
    });

    it('should navigate when deleteWidgetSuccess to /dashboard', () => {
      component.onDelete();
      let widgetId: string = TestBed.get(ActivatedRoute).snapshot['params'].id;
      actions$.next(widgetActionTypes.deleteWidgetSuccess({widgetId}));
      expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');

    });
  });




});
