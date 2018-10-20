import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsContainerComponent } from './actions.container';

describe('SmartActivitiesComponent', () => {
  let component: ActionsContainerComponent;
  let fixture: ComponentFixture<ActionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
