import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicNestedFormComponent } from './dynamic-nested-form.component';

describe('DynamicNestedFormComponent', () => {
  let component: DynamicNestedFormComponent;
  let fixture: ComponentFixture<DynamicNestedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicNestedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicNestedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
