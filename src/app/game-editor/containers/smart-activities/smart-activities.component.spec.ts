import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartActivitiesComponent } from './smart-activities.component';

describe('SmartActivitiesComponent', () => {
  let component: SmartActivitiesComponent;
  let fixture: ComponentFixture<SmartActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
