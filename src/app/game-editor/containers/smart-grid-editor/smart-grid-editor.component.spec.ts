import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGridEditorComponent } from './smart-grid-editor.component';

describe('SmartGridEditorComponent', () => {
  let component: SmartGridEditorComponent;
  let fixture: ComponentFixture<SmartGridEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartGridEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGridEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
