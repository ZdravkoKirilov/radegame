import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFieldEditorComponent } from './smart-field-editor.component';

describe('SmartFieldEditorComponent', () => {
  let component: SmartFieldEditorComponent;
  let fixture: ComponentFixture<SmartFieldEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFieldEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFieldEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
