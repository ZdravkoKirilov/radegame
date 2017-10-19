import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCharacterEditorComponent } from './smart-character-editor.component';

describe('SmartCharacterEditorComponent', () => {
  let component: SmartCharacterEditorComponent;
  let fixture: ComponentFixture<SmartCharacterEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartCharacterEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCharacterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
