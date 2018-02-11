import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartStagesComponent } from './smart-stages.component';

describe('SmartStagesComponent', () => {
  let component: SmartStagesComponent;
  let fixture: ComponentFixture<SmartStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
