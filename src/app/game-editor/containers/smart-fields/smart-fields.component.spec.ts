import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFieldsComponent } from './smart-fields.component';

describe('SmartFieldsComponent', () => {
  let component: SmartFieldsComponent;
  let fixture: ComponentFixture<SmartFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
