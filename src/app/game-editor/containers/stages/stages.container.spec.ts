import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesContainerComponent } from './stages.container';

describe('SmartStagesComponent', () => {
  let component: StagesContainerComponent;
  let fixture: ComponentFixture<StagesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
