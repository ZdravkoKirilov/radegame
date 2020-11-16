import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NestedEntityEditorComponent } from './nested-entity-editor.component';

describe('NestedEntityEditorComponent', () => {
  let component: NestedEntityEditorComponent;
  let fixture: ComponentFixture<NestedEntityEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedEntityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedEntityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
