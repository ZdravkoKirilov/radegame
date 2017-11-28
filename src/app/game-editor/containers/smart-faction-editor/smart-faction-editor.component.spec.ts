import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFactionEditorComponent } from './smart-faction-editor.component';

describe('SmartFactionEditorComponent', () => {
  let component: SmartFactionEditorComponent;
  let fixture: ComponentFixture<SmartFactionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFactionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
