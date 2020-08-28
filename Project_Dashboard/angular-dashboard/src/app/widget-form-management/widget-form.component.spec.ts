import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { WidgetFormComponent } from './widget-form.component';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
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
  let widgetForm: FormGroup; 

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

  describe('onSubmit', () => {


    it('should convert input data to JSON suitable format', () => {
      let formToBeSerialized = new FormGroup({
        title: new FormControl('MyTitle'),
        column: new FormControl(3),
        type: new FormControl(1),
        headerType: new FormControl(2),
        data: new FormControl("[{'firstName': 'Tom'}]")
      });
      component.widgetForm = formToBeSerialized;
      
      spyOn(window, 'alert');
      component.onSubmit();
      expect(window.alert).not.toHaveBeenCalled();
    });

    it('should alert on invalid JSON', () => {
      component.widgetForm = new FormGroup({
        title: new FormControl('MyTitle'),
        column: new FormControl(3),
        type: new FormControl(1),
        headerType: new FormControl(2),
        data: new FormControl('not json data')
      });
      spyOn(window, 'alert');
      component.onSubmit();
      expect(window.alert).toHaveBeenCalledWith('Data input is not valid JSON.');
    })


    it('should navigate when createWidgetSuccess or updateWidgetSuccess to /dashboard', () => {
      let testId: number = 5;
      let widgetValid = {id : testId, title: 'MyTile', column: 3, type: 1, headerType: 2, data: '[]'};
      let validFormGroup = new FormGroup({
        title: new FormControl('MyTitle'),
        column: new FormControl(3),
        type: new FormControl(1),
        headerType: new FormControl(2),
        data: new FormControl('[]')
      });

      component.widgetForm = validFormGroup;
      const update: Update<widgetInterface> = {
        id: testId,
        changes: {
          ...widgetValid
        }
      };

      component.onSubmit();
      actions$.next(...[widgetActionTypes.createWidgetSuccess({widget: widgetValid}), widgetActionTypes.updateWidgetSuccess({update})]);
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
