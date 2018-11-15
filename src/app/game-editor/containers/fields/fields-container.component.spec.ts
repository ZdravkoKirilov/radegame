import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsContainerComponent } from './fields-container.component';

describe('FieldsContainerComponent', () => {
  let component: FieldsContainerComponent;
  let fixture: ComponentFixture<FieldsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
